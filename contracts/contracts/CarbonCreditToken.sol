// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title CarbonCreditToken
 * @dev ERC-1155 token for carbon credits
 */
contract CarbonCreditToken is ERC1155, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    uint256 private _currentTokenId;

    mapping(uint256 => string) public tokenToProject;
    mapping(string => uint256) public projectToToken;
    mapping(uint256 => uint256) public tokenSupply;
    mapping(uint256 => uint256) public retiredCredits;
    mapping(uint256 => string) private _tokenURIs;

    event ProjectTokenCreated(uint256 indexed tokenId, string indexed projectId);
    event CreditsMinted(uint256 indexed tokenId, address indexed recipient, uint256 amount);
    event CreditsRetired(uint256 indexed tokenId, address indexed account, uint256 amount);

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    function createProjectToken(string memory projectId, string memory metadataURI)
        external
        onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        require(projectToToken[projectId] == 0, "Project token already exists");

        _currentTokenId++;
        uint256 newTokenId = _currentTokenId;

        tokenToProject[newTokenId] = projectId;
        projectToToken[projectId] = newTokenId;
        _tokenURIs[newTokenId] = metadataURI;

        emit ProjectTokenCreated(newTokenId, projectId);
        return newTokenId;
    }

    function mintCredits(
        string memory projectId,
        address recipient,
        uint256 amount
    ) external onlyRole(MINTER_ROLE) {
        uint256 tokenId = projectToToken[projectId];
        require(tokenId != 0, "Project token does not exist");

        _mint(recipient, tokenId, amount, "");
        tokenSupply[tokenId] += amount;

        emit CreditsMinted(tokenId, recipient, amount);
    }

    function retireCredits(uint256 tokenId, uint256 amount) external {
        require(balanceOf(msg.sender, tokenId) >= amount, "Insufficient balance");

        _burn(msg.sender, tokenId, amount);
        retiredCredits[tokenId] += amount;

        emit CreditsRetired(tokenId, msg.sender, amount);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getProjectInfo(uint256 tokenId)
        external
        view
        returns (
            string memory projectId,
            uint256 totalSupply,
            uint256 retired,
            string memory metadataURI
        )
    {
        projectId = tokenToProject[tokenId];
        totalSupply = tokenSupply[tokenId];
        retired = retiredCredits[tokenId];
        metadataURI = _tokenURIs[tokenId];
    }

    function getTokenIdForProject(string memory projectId) external view returns (uint256) {
        return projectToToken[projectId];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
