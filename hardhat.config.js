require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
 
// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000000';
 
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.28',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Sei testnet configuration
    seitestnet: {
      url: 'https://evm-rpc-testnet.sei-apis.com',
      accounts: [PRIVATE_KEY],
      chainId: 1328, // Sei testnet chain ID
      gasPrice: 2000000000 // 2 gwei = 2 nsei
    },
    // Sei mainnet configuration
    seimainnet: {
      url: 'https://evm-rpc.sei-apis.com',
      accounts: [PRIVATE_KEY],
      chainId: 1329, // Sei mainnet chain ID
      gasPrice: 2000000000 // 2 gwei = 2 nsei
    },
    // Local development with Hardhat Network
    hardhat: {
      chainId: 31337
    }
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 40000
  }
};