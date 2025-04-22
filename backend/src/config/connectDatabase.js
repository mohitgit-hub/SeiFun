import mongoose from 'mongoose'

//function to connect to the database using the connection string as env variable
const connectDatabase = async () => {
    const uri = process.env.MONGO_URI
    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

export default connectDatabase
