import { ethers } from 'ethers'
import factoryABI from './factory.json'

const factoryAddress = import.meta.env.VITE_FACTORY_RPC

// For write transactions using MetaMask
export async function getFactoryContractWithSigner() {
    if (!window.ethereum) {
        throw new Error('MetaMask is not installed')
    }

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        return new ethers.Contract(factoryAddress, factoryABI, signer)
    } catch (err) {
        console.error('Error connecting to wallet or contract:', err)
        throw err
    }
}

// For read-only contract interaction
export function getFactoryContractReadOnly() {
    // https://sei-testnet.g.alchemy.com/v2/zVPRcN1J_zwwlgFCKO7RJ8UJ2bX7i3a4 - lourdu api
    const rpcUrl = 'https://sei-testnet.g.alchemy.com/v2/jlixJi3oQon9gAvhRrr9vuFuhzu8PVIh'
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

    return new ethers.Contract(factoryAddress, factoryABI, provider)
}

// Fetch all created meme coin projects
export async function fetchAllProjects() {
    try {
        const contract = getFactoryContractReadOnly()
        const projects = await contract.getAllProjects()
        return projects
    } catch (err) {
        console.error('Error fetching projects:', err)
        return []
    }
}
