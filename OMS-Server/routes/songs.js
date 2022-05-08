const router = require("express").Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Song, validate } = require("../models/song");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

// Create song
router.post("/c/", admin, async (req, res) => {
	// console.log(typeof(req.body.artist));
	// console.log(typeof(req.body.name));
	// console.log(req.body);
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });
	
	const song = await Song(req.body).save();
	res.status(201).send({ data: song, message: "Song Created Successfully" });
});

// Get all songs
router.get("/a", async (req, res) => {
	const songs = await (await Song.find()).reverse();
	// console.log(typeof (songs));
	res.status(200).send({ data: songs });
});

// Update song
router.put("/:id", [validateObjectId, admin], async (req, res) => {
	console.log("Update Song...");
	const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: song, message: "Song Updated Successfully" });
});

// Delete song by ID
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
	await Song.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Song Deleted Sucessfully" });
});

// Like song
router.put("/like/:id/:usrid", [validateObjectId, auth], async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.usrid))
		return res.status(404).send({ message: "Invalid ID." });
	
	const song = await Song.findById(req.params.id);
	// console.log("YEPP~~~");
	if (!song) return res.status(400).send({ message: "Song Doesn't Exist" });
	
	const user = await User.findById(req.params.usrid);
	
	const index = user.likedSongs.indexOf(song._id);
	let resMessage = "", liked = false;
	
	if (index === -1){
		user.likedSongs.push(song._id);
		resMessage = "Added to your liked songs";
		console.log("Getting liked:-> " + song._id + "\tUser->> " + user._id);
		liked = true;
	}
	else {
		user.likedSongs.splice(index, 1);
		resMessage = "Removed from your liked songs";
		console.log("Getting unliked:-> " + song._id + "\tUser->> " + user._id);
	}
	
	await user.save();
	// await user.findOneAndUpdate();
	console.log("YEPP~~~");
	res.status(200).send({ message: resMessage, isliked: {liked}});
});

// Get liked songs
router.get("/like", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const songs = await Song.find({ _id: user.likedSongs });
	res.status(200).send({ data: songs });
});

module.exports = router;
