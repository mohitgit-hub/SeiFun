import mongoose from 'mongoose'

//function to connect to the database using the connection string as env variable
const connectDatabase = async () => {
    const uri =
        'mongodb+srv://lourdu:lourdu99@cluster0.7sbkqpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

export default connectDatabase
