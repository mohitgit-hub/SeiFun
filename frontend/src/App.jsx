import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
// page imports
import CreateCoins from './pages/CreateCoins'
import Homepage from './pages/Homepage'
// component imports
import WalletConnect from './components/Wallet/WalletConnect.jsx'
import Layout from './components/ui/Layout.jsx'
import FeedbackForm from './components/Feedback/FeedbackForm.jsx'
import TransactionList from './components/Transaction/TransactionList.jsx'
// styles & services imports
import './App.css'
import './services/walletConnection.jsx'
// redux folder imports
import store from './redux/store.js'
import CoinDetails from './pages/CoinDetails'
import Toast from './components/ui/Toast'

function App() {
    return (
        <Provider store={store}>
            <main className="bg-black min-h-screen">
                <div className="min-h-screen bg-black pb-10">
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/coin/:id" element={<CoinDetails />} />
                            <Route path="/addCoins" element={<CreateCoins />} />
                            <Route path="/wallet" element={<WalletConnect />} />
                            <Route path="/feedback" element={<FeedbackForm />} />
                            <Route path="/transactions" element={<TransactionList />} />
                        </Route>
                    </Routes>
                </div>
                <Toast />
            </main>
        </Provider>
    )
}

export default App
