//User Model creation code

// Import necessary modules
const mongoose = require('mongoose')
// const validator = require('email-validator')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const crypto = require('crypto')

// Define the schema for the User model
const userSchema = mongoose.Schema({
	// User's full name
	name: {
		type: String,
		required: [true, 'Please enter your name'], // Required field with custom error message
	},

	// User's email address
	email: {
		type: String,
		required: [true, 'Please enter your email'], // Required field with custom error message
		unique: true, // Email must be unique
		validate: [validator.validate, 'Please enter valid email'], // Validate email format using email-validator package
	},

	// User's password
	password: {
		type: String,
		required: [true, 'Please enter password'], // Required field with custom error message
		minlength: [8, 'Password has to be at least 8 characters'], // Minimum length constraint
		maxlength: [12, 'Password cannot exceed 12 characters'], // Maximum length constraint
		select: false, // Exclude password from query results by default
	},

	// URL or path to the user's avatar image
	avatar: {
		type: String,
		required: true, // Required field
	},

	// User's role, default is 'user'
	role: {
		type: String,
		default: 'user', // Default value for the role
	},

	// Token used for password reset
	resetPasswordToken: String,

	// Expiration date of the password reset token
	resetPasswordTokenExpire: Date,

	// Timestamp when the user was created
	createdAt: {
		type: Date,
		default: Date.now, // Default value is the current date and time
	},
})

// Middleware to hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
	// Check if the password field is modified (e.g., during registration or password update)
	if (!this.isModified('password')) return next()

	if (this.isModified('password')) {
		// Hash the password using bcrypt with a salt rounds of 10
		this.password = await bcrypt.hash(this.password, 10)
	}

	// Proceed to the next middleware or save operation
	next()
})

// Method to generate a JSON Web Token (JWT) for the user
userSchema.methods.getJwtToken = function () {
	return jwt.sign(
		{ id: this.id }, // Payload containing the user's ID
		process.env.JWT_SECRET, // Secret key for signing the token
		{
			expiresIn: process.env.JWT_EXPIRES_TIME, // Token expiration time
		}
	)
}

// Method to compare an entered password with the stored hashed password
userSchema.methods.isValidPassword = async function (enteredPassword) {
	// Use bcrypt to compare the entered password with the hashed password
	return bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = async function () {
	// Generate a random token using crypto.randomBytes
	// The token will be used to reset the user's password
	const token = await crypto.randomBytes(20).toString('hex')

	// Create a hash of the token using SHA-256 to securely store it in the database
	// This helps to protect the token from being exposed
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(token)
		.digest('hex')

	// Set an expiration time for the token (30 minutes from now)
	// This ensures the reset token is valid only for a limited period
	this.resetPasswordTokenExpire = Date.now() + (30 * 60 * 1000)

	// Return the plain token that will be sent to the user via email
	return token
}

// Create a Mongoose model based on the user schema
const User = mongoose.model('User', userSchema)

// Export the User model for use in other parts of the application
module.exports = User