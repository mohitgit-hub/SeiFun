const mongoose = require('mongoose')

//function to connect to the database using the connection string as env variable
const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_LOCAL_URI)
		.then((con) => {
			console.log(
				`Mongo DB is connected to the host ${con.connection.host}`
			)
		})
}

module.exports = connectDatabase