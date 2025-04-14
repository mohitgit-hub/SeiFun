// Export a function that takes another function (func) as an argument
module.exports = (func) => {
	// Return a new middleware function that takes req, res, and next as arguments
	return (req, res, next) => {
		// Ensure that the function 'func' is called and treated as a Promise
		return (
			Promise.resolve(func(req, res, next))
				// If 'func' throws an error or returns a rejected Promise, catch it
				.catch(next) // Pass the error to the next middleware (error handler)
		)
	}
}