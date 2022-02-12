const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		region: { type: String, required: true},
		count: { type: Number, default: 0},

	},
	{ collection: 'region' }
)

const model = mongoose.model('region', User)

module.exports = model