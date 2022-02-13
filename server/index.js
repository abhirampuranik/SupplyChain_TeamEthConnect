const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Manufacturer = require('./models/manufacturer.model')
const Region = require('./models/regions.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/supplychain')

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		console.log("Here")
		await User.create({
			username: req.body.username,
			aadhar: req.body.aadhar,
			email: req.body.email,
			region: req.body.region,
			password: newPassword,
			flag: "u",
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/manufacturerregister', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		console.log("Here")
		await Manufacturer.create({
			companyname: req.body.companyname,
			manufacturerID: req.body.manufacturerID,
			email: req.body.email,
			password: newPassword,
			flag: "m",
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})



app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})



app.post('/api/mlogin', async (req, res) => {
	const user = await Manufacturer.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})


// app.post('/api/requestregion', function (req, res) {
//     var id = req.body.id;
// 	Meme.findOneAndUpdate({_id :id}, {$inc : {'post.likes' : 1}}).exec(...);
// });

app.get('/api/orders', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		// const decoded = jwt.verify(token, 'secret123')
		// const email = decoded.email
		// const user = await User.findOne({ email: email })

		// const userMap = Region.find({}, function (err, res) {
		// 	if (err) {
		// 		console.log(err);
		// 	  } else {
		// 		console.log(userMap)
		// 		return res.json({ status: 'ok', userMap: userMap })
		// 	  }
		// });
		Region.find({}, function(err, result) {
			if (err) {
			  console.log(err);
			} else {
				
			  res.json({ status: 'ok', userMap: result});
			}
		  });
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/requestregion', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
		console.log(user.region)
		// const r = Region.findOne({region: user.region})
		// console.log(r)
		await Region.updateOne(
			{ region: user.region},
			{$inc : {'count' : 1}}
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})


app.get('/api/sum', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		// const decoded = jwt.verify(token, 'secret123')
		// const email = decoded.email
		// const user = await User.findOne({ email: email })

		// const userMap = Region.find({}, function (err, res) {
		// 	if (err) {
		// 		console.log(err);
		// 	  } else {
		// 		console.log(userMap)
		// 		return res.json({ status: 'ok', userMap: userMap })
		// 	  }
		// });
		Region.find({}, function(err, result) {
			if (err) {
			  console.log(err);
			} else {
			//   res.json({ status: 'ok', userMap: result });
			var totalcount = 0;
			result.forEach(element => {
				totalcount+= element.count;
				
			});
			  res.json({ status: 'ok', totalcount: totalcount });
			}
		  });
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})



app.listen(1337, () => {
	console.log('Server started on 1337')
});