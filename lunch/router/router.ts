const superagent = require('superagent');
const express = require("express")
const router = express.Router();
// imports everything

// Makes the router
router.get('/', (req, res) => {
	res.send("Server is runing");
});

let client_secret = process.env.SECRET
let client_id = process.env.ID

router.get("/callback/login/", (req, res, next) => {
	const { query } = req
	console.log(query)
	const { code } = query;

	if (!code) {
		return res.send({
			success: false
		})
	}

	superagent
	.post('https://github.com/login/oauth/access_token')
	.send({ 
		client_id: "c2e8e27f6c14e43666a4", 
		client_secret: "e67d02d7dfe7f898af8f72833d8a8a7afe0fddeb",
		code: code
	}) // sends a JSON post body
	.set('Accept', 'application/json')
	.end((err, data) => {
		const newData = data.body;
		console.log(newData)
		res.redirect('http://localhost:3000/')
	});	


	console.log(code)

})


// exports it
module.exports = router;