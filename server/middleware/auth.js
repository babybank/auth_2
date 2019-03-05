const { User } = require('./../models/user');

let auth = (request,response,next) => {
	let token = request.cookies.auth;
	// console.log(token);
	User.findByToken(token, (err,user) => {
		// console.log(user);
		if(err) {
			throw err;
		}
		if(!user){
			return response.status(401).send('no access');
		}
		request.token = token;
		next();
		// response.status(200).send('you have access');
	})
}

module.exports = { auth }