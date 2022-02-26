const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { number } = require("joi");

// create user
router.post("/c", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400)
						.send({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (user)
		return res.status(403)
			.send({ message: "User with given email already Exist!" });

	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	let newUser = await new User({
		...req.body,
		password: hashPassword,
	}).save();

	newUser.password = undefined;
	newUser.__v = undefined;
	res.status(200)
		.send({ data: newUser, message: "Account Successfully Created!" });
});

// get all users
router.get("/a", admin, async (req, res) => {
	const users = await User.find().select("-password -__v");
	res.status(200).send({ data: users });
});

// get likes by id
router.get("/:id/:ul", [validateObjectId, auth], async (req, res) => {
	const user = await User.findById(req.params.id).select('-password -__v');
	if (!user) return res.status(404).send("Not Found!");
	console.log("User Logged, ID: "  + user._id);
	
	const likes = Object.keys(user.likedSongs).length;
	console.log("User Liked Songs: "  + likes);
	res.status(200).send({ likes: JSON.parse(Number(likes)) });
});

// get user by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findById(req.params.id).select('-password -__v');
	if (!user) return res.status(404).send("Not Found!");
	console.log("User Logged, ID: "  + user._id);
	if(req.params.ul === "true"){
		const likes = Object.keys(user.likedSongs).length;
		console.log("User Liked Songs: "  + likes);
		res.status(200).send({ data: user, likes: likes });
	}
	else
		res.status(200).send({ data: user });
});

// update user by id
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -__v");
	res.status(200)
		.send({ data: user, message: "Profile updated successfully" });
});

// delete user by id
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200)
		.send({ message: "Successfully deleted user." });
});

module.exports = router;
