const express = require("express")
const router = express.Router();
// imports everything

// Makes the router
router.get('/', (req, res) => {
	res.send("Server is runing");
});

// exports it
module.exports = router;