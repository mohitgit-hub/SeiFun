import React, { useState } from 'react'
import { getFactoryContractWithSigner } from '../../constants/factoryconfig'
import { uploadImage, createCoinInDB } from '../../services/api'
import CoinForm from './CoinForm'
import { showToast } from '../ui/Toast' // adjust path as needed

function AddCoins() {
    const [formData, setFormData] = useState({
        memeCoinTitle: '',
        tickerTitle: '',
        description: '',
        x_link: '',
        tele_link: '',
        website_link: '',
        token: '',
        marketplace: '',
        walletaddress: '',
    })

    const handleTransaction = async () => {
        showToast('Connecting to wallet...', 'info')
        try {
            const contract = await getFactoryContractWithSigner()
            if (!contract) {
                showToast('❌ Failed to connect to contract.', 'error')
                return null // return early
            }

            const signerAddress = await contract.signer.getAddress()
            showToast('📤 Sending transaction...', 'info')
            const tx = await contract.createProject(formData.memeCoinTitle, formData.tickerTitle, {
                value: BigInt('20000000000000000'),
            })

            if (!tx || !tx.hash) {
                showToast('Transaction was not sent.', 'error')
                return null
            }

            showToast(`📨 Transaction sent! Hash: ${tx.hash}`, 'info')
            const receipt = await tx.wait()

            if (receipt.status === 1) {
                showToast('✅ Transaction confirmed! 🎉', 'success')

                const event = receipt.events?.find(
                    (e) => e.event === 'ProjectCreated' || e.event === 'NewProjectCreated'
                )

                if (event && event.args) {
                    const tokenAddress = event.args.token
                    const marketplaceAddress = event.args.marketplace

                    // create updated formData and return it
                    const updatedData = {
                        ...formData,
                        walletaddress: signerAddress,
                        token: tokenAddress,
                        marketplace: marketplaceAddress,
                    }
                    setFormData(updatedData)
                    return updatedData
                } else {
                    showToast(
                        '⚠️ Could not extract token/marketplace addresses from event.',
                        'warning'
                    )
                    return null
                }
            } else {
                showToast('❌ Transaction failed.', 'error')
                return null
            }
        } catch (error) {
            console.error('Transaction error:', error)
            showToast(`❌ Transaction failed: ${error.message}`, 'error')
            return null
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedData = await handleTransaction()
        if (!updatedData) return

        const file = e.target.elements.image?.files[0]
        let imgURL = ''
        if (file) {
            imgURL = await uploadImage(file, (msg, type) => showToast(msg, type))
        }

        await createCoinInDB({ ...updatedData, path: imgURL }, (msg, type) => showToast(msg, type))
    }

    return (
        <div className="my-12 flex justify-around max-w-[1000px] mx-auto items-center">
            <div>
                <CoinForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default AddCoins
