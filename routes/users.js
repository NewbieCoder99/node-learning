var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('auth/login', { title : process.env.NODE_APP_NAME });
});

module.exports = router;
