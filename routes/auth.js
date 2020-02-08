const 	express = require('express'),
		router = express.Router(),
		authController = require('../controllers/authController'),
		{ check } = require('express-validator');

router
	.get('/', authController.index)
	.post('/',[
		check('email','Email is required').not().isEmpty(),
		check('email','Invalid email format').isEmail(),
		check('password', 'Class Year should be a number').not().isEmpty(),
  	], authController.login);

module.exports = router;
