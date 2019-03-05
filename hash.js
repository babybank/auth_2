const bcrypt = require('bcrypt');
const { MD5 } = require('crypto-js');
const jwt = require('jsonwebtoken');
// bcrypt.genSalt(10, (err,salt) => {
// 	if(err){
// 		return next(err);
// 	}
// 	bcrypt.hash('password123', salt, (err, hash) => {
// 		if(err){
// 			return next(err);
// 		}
// 		console.log(hash)
// 	})
// 	// console.log(salt);

// })

// const secret = 'mysecretpassword';
// const secretSalt = 'sadasdasfasdasasdasd';

// const user = {
// 	id:1,
// 	token: MD5('SDSDSDSDSDSD').toString() + secretSalt
// }

// const receivedToken = '39bbfd3d26ff850367272d273fbca56dsadasdasfasdasasdasd';
// if(receivedToken === user.token){
// 	console.log('move forward');
// }

// console.log(user);

const id = '1000';
const secret = 'supersecret';

const receivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';

const token = jwt.sign(id,secret);
const decodeToken = jwt.verify(receivedToken,secret);

console.log(decodeToken);