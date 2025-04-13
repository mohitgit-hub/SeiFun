const ErrorHandler = require('../utils/errorHandlerClass') // Import the ErrorHandler class

/* 
    This function handles errors specific to production and development environments 
    and sends the appropriate error message to users and developers.
*/
module.exports = (errObj, req, res, next) => {
	// Set the status code to 500 if not already set
	errObj.statusCode = errObj.statusCode || 500

	// Handle errors for the production environment
	if (process.env.NODE_ENV === 'production') {
		let message = errObj.message // Get the error message
		let error = new ErrorHandler(message, 400) // Create an instance of ErrorHandler with the message

		// Handle validation errors
		if (errObj.name === 'ValidationError') {
			// Extract validation error messages from the error object
			message = Object.values(errObj.errors).map((value) => value.message)
			error = new ErrorHandler(message, 400) // Create a new error instance with the validation messages
		}

		// Handle cast errors (e.g., invalid MongoDB ObjectId)
		if (errObj.name === 'CastError') {
			message = `Resource not found: ${errObj.path}` // Set a message indicating the resource was not found
			error = new ErrorHandler(message, 400) // Create a new error instance with the message
		}

		// Handle duplicate key errors (e.g., unique constraint violations)
		if (errObj.code === 11000) {
			message = `Duplicate ${Object.keys(errObj.keyValue)} error` // Set a message indicating a duplicate error
			error = new ErrorHandler(message, 400) // Create a new error instance with the message
		}

		// Handle JSON Web Token errors
		if (errObj.name === 'JSONWebTokenError') {
			message = `Json Web Token is invalid. Try again` // Set a message for invalid JWT
			error = new ErrorHandler(message, 400) // Create a new error instance with the message
		}

		// Handle expired JSON Web Tokens
		if (errObj.name === 'TokenExpiredError') {
			message = `Json Web Token is Expired` // Set a message for expired JWT
			error = new ErrorHandler(message, 400) // Create a new error instance with the message
		}

		// Handle authentication errors
		if (errObj.name === 'AuthenticationError') {
			message = 'Invalid credentials provided'
			error = new ErrorHandler(message, 401)
		}

		// Handle authorization errors
		if (errObj.name === 'AuthorizationError') {
			message = 'You do not have permission to access this resource'
			error = new ErrorHandler(message, 403)
		}

		// Handle input validation errors
		if (errObj.name === 'InputValidationError') {
			message = 'Invalid input provided'
			error = new ErrorHandler(message, 400)
		}

		// Send the error response to the client
		res.status(error.statusCode).json({
			success: false, // Indicate that the request was not successful
			message: error.message || 'Internal Server Error', // Send the error message or a default message
		})
	}

	// Handle errors for the development environment
	if (process.env.NODE_ENV === 'development') {
		// Send detailed error information to the client
		res.status(errObj.statusCode).json({
			success: false, // Indicate that the request was not successful
			message: errObj.message, // Send the original error message
			stack: errObj.stack, // Include the stack trace for debugging
			error: errObj, // Send the entire error object for further inspection
		})
	}
}