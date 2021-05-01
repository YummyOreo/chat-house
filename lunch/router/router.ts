let express = require("express")
let router = express.Router();
// imports everything

// Makes the router
router.get('/', (req, res) => {
	res.send("Server is runing");
});


// exports it
module.exports = router;