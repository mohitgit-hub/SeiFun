import axios from 'axios'

export const uploadImage = async (imageFile, setStatus) => {
    try {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', 'Sei-coin-images')
        formData.append('cloud_name', 'dvtih3sd4')

        //setStatus('Sending image to the server...','info')
        const res = await axios.post(
            'https://api.cloudinary.com/v1_1/dvtih3sd4/image/upload',
            formData
        )

        const url = res.data.secure_url
        console.log('Image uploaded:', url)
        //setStatus('Image uploaded successfully','success')
        return url
    } catch (error) {
        console.error('Image upload failed:', error)
        setStatus(`Image upload failed: ${error.message}`, 'error')
        return ''
    }
}

export const createCoinInDB = async (coinData, setStatus) => {
    try {
        const res = await axios.post('http://localhost:5000/api/coin/createCoin', coinData)
        console.log('Coin created:', res.data)
        setStatus('Coin created successfully!', 'success')
    } catch (error) {
        console.error('Coin creation failed:', error)
        setStatus(`Error: ${error.message}`, 'error')
    }
}
