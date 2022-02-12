const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		// username: { type: String, required: true},
		// aadhar: { type: String, required: true },
		// email: { type: String, required: true , unique: true },
		// region: { type: String, required: true },
		// password: { type: String, required: true },
		// isManufacturer: { type: String, required: true },
        companyname: { type: String},
        manufacturerID: { type: String},
        email: { type: String},
        password: { type: String},
        flag: { type: String},
	},
	{ collection: 'manufacturer-data' }
)

const model = mongoose.model('manufacturer-data', User)

module.exports = model