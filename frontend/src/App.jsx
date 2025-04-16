import './App.css'
import './services/walletConnection.jsx'
import { Routes, Route } from 'react-router-dom'

import CreateCoins from './pages/CreateCoins'
import Homepage from './pages/Homepage.jsx'
import WalletConnect from './components/WalletConnect'
import Layout from './components/Layout.jsx'
import FeedbackForm from './components/Feedback/FeedbackForm.jsx'
import TransactionList from './components/Transaction/TransactionList.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

function App() {
    return (
        <Provider store={store}>
            <main className="bg-black min-h-screen">
                {/* <WalletConnection> </WalletConnection> */}
                <div className="min-h-screen bg-black pb-10">
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/addCoins" element={<CreateCoins />} />
                            <Route path="/wallet" element={<WalletConnect />} />
                            <Route path="/feedback" element={<FeedbackForm />} />
                            <Route path="/transactions" element={<TransactionList />} />
                        </Route>
                    </Routes>
                </div>
            </main>
        </Provider>
    )
}

export default App
