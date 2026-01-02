// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ProjectRegistry.sol";
import "./CarbonCreditToken.sol";

/**
 * @title VerificationWorkflow
 * @dev Multi-level verification system for carbon projects
 */
contract VerificationWorkflow is AccessControl {
    bytes32 public constant NGO_VERIFIER_ROLE = keccak256("NGO_VERIFIER_ROLE");
    bytes32 public constant PANCHAYAT_ROLE = keccak256("PANCHAYAT_ROLE");
    bytes32 public constant NCCR_ROLE = keccak256("NCCR_ROLE");

    ProjectRegistry public projectRegistry;
    CarbonCreditToken public carbonToken;

    struct VerificationRecord {
        address verifier;
        uint256 timestamp;
        string dataHash;
        bool approved;
    }

    mapping(string => VerificationRecord) public ngoVerifications;
    mapping(string => VerificationRecord) public panchayatVerifications;
    mapping(string => VerificationRecord) public nccrVerifications;

    event NGOVerificationSubmitted(string indexed projectId, address indexed verifier);
    event PanchayatApprovalSubmitted(string indexed projectId, address indexed verifier);
    event NCCRApprovalSubmitted(string indexed projectId, address indexed verifier, uint256 credits);

    constructor(address _projectRegistry, address _carbonToken) {
        projectRegistry = ProjectRegistry(_projectRegistry);
        carbonToken = CarbonCreditToken(_carbonToken);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(NGO_VERIFIER_ROLE, msg.sender);
        _grantRole(PANCHAYAT_ROLE, msg.sender);
        _grantRole(NCCR_ROLE, msg.sender);
    }

    function ngoVerify(
        string memory projectId,
        string memory dataHash,
        bool approve
    ) external onlyRole(NGO_VERIFIER_ROLE) {
        ngoVerifications[projectId] = VerificationRecord({
            verifier: msg.sender,
            timestamp: block.timestamp,
            dataHash: dataHash,
            approved: approve
        });

        if (approve) {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.NGOVerified);
        } else {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.Rejected);
        }

        emit NGOVerificationSubmitted(projectId, msg.sender);
    }

    function panchayatApprove(
        string memory projectId,
        string memory dataHash,
        bool approve
    ) external onlyRole(PANCHAYAT_ROLE) {
        require(ngoVerifications[projectId].approved, "NGO verification not approved");

        panchayatVerifications[projectId] = VerificationRecord({
            verifier: msg.sender,
            timestamp: block.timestamp,
            dataHash: dataHash,
            approved: approve
        });

        if (approve) {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.PanchayatReviewed);
        } else {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.Rejected);
        }

        emit PanchayatApprovalSubmitted(projectId, msg.sender);
    }

    function nccrApprove(
        string memory projectId,
        string memory dataHash,
        uint256 carbonCredits,
        string memory metadataURI,
        bool approve
    ) external onlyRole(NCCR_ROLE) {
        require(panchayatVerifications[projectId].approved, "Panchayat approval not granted");

        nccrVerifications[projectId] = VerificationRecord({
            verifier: msg.sender,
            timestamp: block.timestamp,
            dataHash: dataHash,
            approved: approve
        });

        if (approve) {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.NCCRApproved);
            projectRegistry.recordIssuedCredits(projectId, carbonCredits);

            // Create token if doesn't exist
            uint256 tokenId = carbonToken.getTokenIdForProject(projectId);
            if (tokenId == 0) {
                carbonToken.createProjectToken(projectId, metadataURI);
            }

            // Mint credits to project owner
            ProjectRegistry.Project memory project = projectRegistry.getProject(projectId);
            carbonToken.mintCredits(projectId, project.owner, carbonCredits);

            emit NCCRApprovalSubmitted(projectId, msg.sender, carbonCredits);
        } else {
            projectRegistry.updateProjectStatus(projectId, ProjectRegistry.ProjectStatus.Rejected);
        }
    }
}
