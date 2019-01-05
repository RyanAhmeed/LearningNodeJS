const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
	//res.send("Hello, World!");

	res.render('index', {title: "FIRST TITLE", message: "HELLO"})
});

module.exports = router;

