import mongoose from 'mongoose'

const coinSchema = mongoose.Schema({
    token: { type: String, required: true },
    marketplace: { type: String, required: true },
    walletaddress: { type: String, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    x_link: {
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return !v || /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v) // Regex for URL validation
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
    tele_link: {
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return !v || /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v) // URL validation
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
    website_link: {
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return !v || /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v) // URL validation
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
    createdAt: { type: Date, default: Date.now },
})

const CoinModel = mongoose.model('Coins', coinSchema)

export default CoinModel
