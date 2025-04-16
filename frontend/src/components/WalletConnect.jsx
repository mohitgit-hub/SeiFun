import WalletConnection, { useWalletLogic } from '../services/walletConnection'
import MetaMaskButton from './WalletButtons/MetaMaskButton'
import CoinBaseButton from './WalletButtons/CoinBaseButton'
import OperaWalletButton from './WalletButtons/OperaWalletButton'
import WalletConnectButton from './WalletButtons/WalletConnectButton'
import FormaticWalletButton from './WalletButtons/FormaticWalletButton'

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
                            onClick={() => connectWallet(connector.id)}
                            className="my-4"
                        >
                            {walletInfo.icon}
                        </button>
                    )
                })}
            </div>

            {/* {address && (
                <div className="mt-4 p-3 rounded bg-gray-800 text-white">
                    <p>
                        <strong>Address:</strong> {address}
                    </p>
                    <p>
                        <strong>Balance:</strong> {balance?.data?.formatted} SEI
                    </p>
                </div>
            )} */}
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
