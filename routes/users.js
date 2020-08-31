var express = require('express');
var router = express.Router();
const users = require('../models/users');
jwt = require('jsonwebtoken'),
	ejwt = require('express-jwt'),
  db = require('../db');
  var Sequelize = require('sequelize');

  var sequelize = new Sequelize('test_db', 'root', 'root');
var multer = require('multer');
var app = module.exports = express.Router();

test

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

app.post('/user/login', function (req, res) {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send({ msg: "You must send the email and the password" });
	}
	db.users.findAll(
		{
			include: [{
				model: db.user_types,
				attributes: [
					'type'
				]
			}],
			where: { email: req.body.email }, limit: 1 
		}
	).then(user => {
		if (!user[0]) {
			return res.status(401).send({ msg: "The email is not existing" });
		}

		var shasum = crypto.createHash('sha1');
		shasum.update(req.body.password);
		var password = shasum.digest('hex');

		if (user[0].password !== password) {
			return res.status(401).send({ msg: "The email or password don't match" });
		}
		//Update user to log login date and time

		users.update({
			last_login_date: moment().format('llll')
		}, { where: { user_id: user[0].user_id } }).then(function (u) {
			console.log("Last Login date logged!!");
		});

		let newUser =  {
			user_id: user[0].user_id,
			full_name: user[0].full_name,
			email: user[0].email,
			phone_number: user[0].phone_number,
			avatar: user[0].avatar,
			active: user[0].active,
			user_type: user[0].user_type
		}

		res.status(201).send({
			id_token: createToken(newUser)
		});

	});
});