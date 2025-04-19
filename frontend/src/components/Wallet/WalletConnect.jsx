// wallet services imports
import WalletConnection, { useWalletLogic } from '../../services/walletConnection'
// wallet button imports
import MetaMaskButton from './WalletButtons/MetaMaskButton'
import CoinBaseButton from './WalletButtons/CoinBaseButton'
import OperaWalletButton from './WalletButtons/OperaWalletButton'
import WalletConnectButton from './WalletButtons/WalletConnectButton'
import FormaticWalletButton from './WalletButtons/FormaticWalletButton'
// redux imports
import { setAddress } from '../../redux/features/wallet/walletSlice'
import { setBalance } from '../../redux/features/wallet/walletSlice'
import { useDispatch } from 'react-redux'

const walletDisplayMap = {
    injected: {
        id: 'injected',
        name: 'MetaMask',
        icon: <MetaMaskButton />,
    },
    coinbaseWallet: {
        id: 'coinbaseWallet',
        name: 'Coinbase',
        icon: <CoinBaseButton />,
    },
    trust: {
        id: 'trust',
        name: 'Trust Wallet',
        icon: <OperaWalletButton />,
    },
    walletConnect: {
        id: 'walletConnect',
        name: 'Wallet Connect',
        icon: <WalletConnectButton />,
    },
    formatic: {
        id: 'formatic',
        name: 'Formatic',
        icon: <FormaticWalletButton />,
    },
}

function CustomWalletCard() {
    const { connectWallet, connectors } = useWalletLogic()
    const dispatch = useDispatch()

    const handleConnect = async (connectorId) => {
        try {
            const { address, balance } = await connectWallet(connectorId) // Ensure connectWallet returns address and balance
            dispatch(setAddress(address)) // Dispatch the address to the Redux store
            dispatch(setBalance(balance)) // Dispatch the balance to the Redux store
            localStorage.setItem('walletaddress', address) // Store the address in local storage
            localStorage.setItem('walletBalance', balance) // Store the balance in local storage
        } catch (error) {
            console.error('Error connecting wallet:', error)
        }
    }

    return (
        <div className="max-w-sm min-h-screen flex flex-col mx-auto">
            <h5 className="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Connect wallet
            </h5>
            <p className="text-sm font-normal mb-4 text-gray-500 dark:text-gray-400">
                Connect with one of our available wallet providers
            </p>

            <div className="flex flex-col gap-4">
                {connectors.map((connector) => {
                    const walletInfo = walletDisplayMap[connector.id] || {
                        name: connector.name,
                        icon: '', // fallback
                    }

                    return (
                        <button
                            key={connector.id}
                            onClick={() => handleConnect(connector.id)} // Use handleConnect here
                            className="my-4"
                        >
                            {walletInfo.icon}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
export default function WalletConnect() {
    return (
        <WalletConnection>
            <CustomWalletCard />
        </WalletConnection>
    )
}
