const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth')

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.post('/api/user', (request,response) => {

	const user = new User({
		email: request.body.email,
		password: request.body.password
	})

	user.save((err,doc) =>{
		if(err){
			response.status(400).send(err);
		}
		response.status(200).send(doc);
	});
	
})

app.post('/api/user/login', (request, response) => {

	User.findOne({'email':request.body.email}, (err,user) => {
		if(!user){
			response.json({message: 'Auth failed, user not found'})
		}
		user.comparePassword(request.body.password, (err, isMatch) => {
			if(err){
				throw err;
			}
			if(!isMatch){
				return  response.status(400).json({
					message: 'Wrong Password'
				})
			}
			user.generateToken((err,user)=>{
				if(err){
					return response.status(400).send(err);
				}
				response.cookie('auth',user.token).send('ok');
			})
			// response.status(200).send(isMatch)
		})
		// response.status(200).send(user)
	})
	
})

app.get('/user/profile',auth, (request,response) => {
	response.status(200).send(request.token);
	// response.status(200).send('ok');
})



app.listen(port,() => {
	console.log(`Started on port ${port}`);
})