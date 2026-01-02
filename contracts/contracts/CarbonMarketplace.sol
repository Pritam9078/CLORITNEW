// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./CarbonCreditToken.sol";

/**
 * @title CarbonMarketplace
 * @dev Simple marketplace for trading carbon credits
 */
contract CarbonMarketplace is AccessControl, ERC1155Holder {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    CarbonCreditToken public carbonToken;

    struct Listing {
        uint256 listingId;
        address seller;
        uint256 tokenId;
        uint256 amount;
        uint256 pricePerCredit;
        bool active;
    }

    uint256 private _listingCounter;
    uint256 public marketplaceFee = 200; // 2%
    address public feeRecipient;

    mapping(uint256 => Listing) public listings;

    event ListingCreated(uint256 indexed listingId, address indexed seller, uint256 tokenId, uint256 amount, uint256 price);
    event TradeExecuted(uint256 indexed listingId, address indexed buyer, uint256 amount, uint256 totalPrice);
    event ListingCancelled(uint256 indexed listingId);

    constructor(address _carbonToken, address _feeRecipient) {
        carbonToken = CarbonCreditToken(_carbonToken);
        feeRecipient = _feeRecipient;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OPERATOR_ROLE, msg.sender);
    }

    function createListing(
        uint256 tokenId,
        uint256 amount,
        uint256 pricePerCredit
    ) external returns (uint256) {
        require(amount > 0, "Amount must be greater than 0");
        require(pricePerCredit > 0, "Price must be greater than 0");

        carbonToken.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        _listingCounter++;
        uint256 listingId = _listingCounter;

        listings[listingId] = Listing({
            listingId: listingId,
            seller: msg.sender,
            tokenId: tokenId,
            amount: amount,
            pricePerCredit: pricePerCredit,
            active: true
        });

        emit ListingCreated(listingId, msg.sender, tokenId, amount, pricePerCredit);
        return listingId;
    }

    function buyCredits(uint256 listingId, uint256 amount) external payable {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(amount <= listing.amount, "Insufficient amount");

        uint256 totalPrice = amount * listing.pricePerCredit;
        require(msg.value >= totalPrice, "Insufficient payment");

        uint256 fee = (totalPrice * marketplaceFee) / 10000;
        uint256 sellerAmount = totalPrice - fee;

        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.active = false;
        }

        carbonToken.safeTransferFrom(address(this), msg.sender, listing.tokenId, amount, "");

        payable(listing.seller).transfer(sellerAmount);
        payable(feeRecipient).transfer(fee);

        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        emit TradeExecuted(listingId, msg.sender, amount, totalPrice);
    }

    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not listing owner");
        require(listing.active, "Listing not active");

        listing.active = false;
        carbonToken.safeTransferFrom(address(this), msg.sender, listing.tokenId, listing.amount, "");

        emit ListingCancelled(listingId);
    }

    function setMarketplaceFee(uint256 newFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newFee <= 1000, "Fee too high");
        marketplaceFee = newFee;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl, ERC1155Holder)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
