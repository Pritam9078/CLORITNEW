// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ProjectRegistry
 * @dev Simple registry for blue carbon restoration projects
 */
contract ProjectRegistry is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    enum ProjectStatus {
        Submitted,
        NGOVerified,
        PanchayatReviewed,
        NCCRApproved,
        Active,
        Rejected
    }

    struct Project {
        string projectId;
        address owner;
        string metadataURI;
        uint256 areaHectares;
        ProjectStatus status;
        uint256 estimatedCarbonCredits;
        uint256 issuedCarbonCredits;
        uint256 registrationDate;
        bool exists;
    }

    mapping(string => Project) private projects;
    string[] private allProjectIds;
    mapping(address => string[]) private ownerProjects;

    event ProjectRegistered(string indexed projectId, address indexed owner);
    event ProjectStatusUpdated(string indexed projectId, ProjectStatus newStatus);
    event CarbonCreditsEstimated(string indexed projectId, uint256 amount);
    event CarbonCreditsIssued(string indexed projectId, uint256 amount);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REGISTRAR_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }

    function registerProject(
        string memory projectId,
        string memory metadataURI,
        uint256 areaHectares
    ) external returns (bool) {
        require(!projects[projectId].exists, "Project already exists");
        require(bytes(projectId).length > 0, "Invalid project ID");

        projects[projectId] = Project({
            projectId: projectId,
            owner: msg.sender,
            metadataURI: metadataURI,
            areaHectares: areaHectares,
            status: ProjectStatus.Submitted,
            estimatedCarbonCredits: 0,
            issuedCarbonCredits: 0,
            registrationDate: block.timestamp,
            exists: true
        });

        allProjectIds.push(projectId);
        ownerProjects[msg.sender].push(projectId);

        emit ProjectRegistered(projectId, msg.sender);
        return true;
    }

    function updateProjectStatus(string memory projectId, ProjectStatus newStatus)
        external
        onlyRole(VERIFIER_ROLE)
    {
        require(projects[projectId].exists, "Project does not exist");
        projects[projectId].status = newStatus;
        emit ProjectStatusUpdated(projectId, newStatus);
    }

    function setEstimatedCredits(string memory projectId, uint256 estimatedCredits)
        external
        onlyRole(VERIFIER_ROLE)
    {
        require(projects[projectId].exists, "Project does not exist");
        projects[projectId].estimatedCarbonCredits = estimatedCredits;
        emit CarbonCreditsEstimated(projectId, estimatedCredits);
    }

    function recordIssuedCredits(string memory projectId, uint256 issuedCredits)
        external
        onlyRole(VERIFIER_ROLE)
    {
        require(projects[projectId].exists, "Project does not exist");
        projects[projectId].issuedCarbonCredits = issuedCredits;
        emit CarbonCreditsIssued(projectId, issuedCredits);
    }

    function getProject(string memory projectId) external view returns (Project memory) {
        require(projects[projectId].exists, "Project does not exist");
        return projects[projectId];
    }

    function getProjectsByOwner(address owner) external view returns (string[] memory) {
        return ownerProjects[owner];
    }

    function getTotalProjects() external view returns (uint256) {
        return allProjectIds.length;
    }
}
