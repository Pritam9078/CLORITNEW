import { ethers } from 'ethers';
import addresses from './addresses.json';
import ProjectRegistryABI from './ProjectRegistry.json';
import CarbonCreditTokenABI from './CarbonCreditToken.json';
import VerificationWorkflowABI from './VerificationWorkflow.json';

// Contract addresses
export const CONTRACT_ADDRESSES = addresses;

// Local Hardhat network configuration
export const NETWORK_CONFIG = {
    chainId: 31337,
    name: 'Hardhat Local',
    rpcUrl: 'http://127.0.0.1:8545',
};

// Get provider
export const getProvider = () => {
    return new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
};

// Get signer
export const getSigner = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        return await provider.getSigner();
    }
    throw new Error('No wallet connected');
};

// Contract instances
export const getProjectRegistry = async (signerOrProvider?: any) => {
    const provider = signerOrProvider || getProvider();
    return new ethers.Contract(
        CONTRACT_ADDRESSES.projectRegistry,
        ProjectRegistryABI.abi,
        provider
    );
};

export const getCarbonToken = async (signerOrProvider?: any) => {
    const provider = signerOrProvider || getProvider();
    return new ethers.Contract(
        CONTRACT_ADDRESSES.carbonToken,
        CarbonCreditTokenABI.abi,
        provider
    );
};

export const getVerificationWorkflow = async (signerOrProvider?: any) => {
    const provider = signerOrProvider || getProvider();
    return new ethers.Contract(
        CONTRACT_ADDRESSES.verificationWorkflow,
        VerificationWorkflowABI.abi,
        provider
    );
};

// Helper functions
export const registerProject = async (
    projectId: string,
    metadataURI: string,
    areaHectares: number
) => {
    const signer = await getSigner();
    const registry = await getProjectRegistry(signer);

    const tx = await registry.registerProject(projectId, metadataURI, areaHectares);
    const receipt = await tx.wait();

    return receipt;
};

export const getProject = async (projectId: string) => {
    const registry = await getProjectRegistry();
    return await registry.getProject(projectId);
};

export const getUserProjects = async (address: string) => {
    const registry = await getProjectRegistry();
    return await registry.getProjectsByOwner(address);
};

export const getCarbonBalance = async (address: string, tokenId: number) => {
    const token = await getCarbonToken();
    return await token.balanceOf(address, tokenId);
};

export const getProjectTokenInfo = async (tokenId: number) => {
    const token = await getCarbonToken();
    return await token.getProjectInfo(tokenId);
};

// Format helpers
export const formatCredits = (amount: bigint) => {
    return ethers.formatUnits(amount, 0); // No decimals for credits
};

export const parseCredits = (amount: string) => {
    return ethers.parseUnits(amount, 0);
};
