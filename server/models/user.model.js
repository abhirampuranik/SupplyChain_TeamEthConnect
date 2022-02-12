const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		username: { type: String, required: true},
		aadhar: { type: String, required: true },
		email: { type: String, required: true , unique: true },
		region: { type: String, required: true },
		password: { type: String, required: true },
		flag: { type: String, required: true },
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('user-data', User)

module.exports = model