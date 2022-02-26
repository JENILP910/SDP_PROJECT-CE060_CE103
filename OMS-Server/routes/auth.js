const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
	return res.status(400).send({ message: "invalid Email or Password!" });
	
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
	return res.status(400).send({ message: "Invalid Email or Password!" });
	
	const token = user.generateAuthToken();
	console.log("Logging in: " + req.body.email);
	res.status(200).send({ data: token, message: "Signing in Please wait..." });
});

module.exports = router;
