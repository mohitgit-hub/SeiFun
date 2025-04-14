import './App.css'
import './walletConnection.jsx'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreateCoins from './pages/CreateCoins'
import Footer from './components/Footer'
import ProfilePage from './pages/ProfilePage'
import Homepage from './pages/Homepage.jsx'
import WalletConnect from './components/WalletConnect'
import Layout from './components/Layout.jsx'
// import Login from './components/AuthComponents/Login'

function App() {
	return (
		<main className='bg-gray-900 min-h-screen'>
			{/* <WalletConnection> </WalletConnection> */}
			<div className='min-h-screen bg-[#212529] pb-10'>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' element={<Homepage />} />
						<Route path='/addCoins' element={<CreateCoins />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/wallet' element={<WalletConnect />} />
					</Route>
				</Routes>
			</div>
		</main>
	)
}

export default App
