import { ethers } from 'ethers';
import factoryABI from './factory.json';

const factoryAddress = '0x17131a4EaB3532e16Da3b2236DE82D5D5379498b';

// ✅ Read-Write Contract instance (connected to wallet like MetaMask)
export async function getFactoryContractWithSigner() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    // Request wallet connection
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(factoryAddress, factoryABI, signer);
  } catch (err) {
    console.error('Error connecting to wallet or contract:', err);
    throw err;
  }
}

// ✅ Read-Only Contract instance (no wallet needed)
export function getFactoryContractReadOnly() {
  // You can replace this with your Sei EVM RPC URL later
  const rpcUrl = 'https://sei-testnet.g.alchemy.com/v2/jlixJi3oQon9gAvhRrr9vuFuhzu8PVIh'; // TEMP fallback, replace later
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  return new ethers.Contract(factoryAddress, factoryABI, provider);
}
