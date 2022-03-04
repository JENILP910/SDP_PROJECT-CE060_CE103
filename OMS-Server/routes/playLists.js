const router = require("express").Router();
const { PlayList, validate } = require("../models/playList");
const { Song } = require("../models/song");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");

// create playlist
router.post("/c", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playList = await PlayList({ ...req.body}).save();
	user.playlists.push(playList._id);
	await user.save();

	res.status(201).send({ data: playList });
});

// Edit playlist by id
router.put("/edit/:id", [validateObjectId, auth], async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		desc: Joi.string().allow(""),
		img: Joi.string().allow(""),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const playlist = await PlayList.findById(req.params.id);
	if (!playlist) return res.status(404).send({ message: "Playlist Not Found" });

	const user = await User.findById(req.user._id);
	if (!user._id.equals(playlist.usrid))
		return res.status(403).send({ message: "You don't have Access to Edit!" });

	playlist.name = req.body.name;
	playlist.desc = req.body.desc;
	playlist.img = req.body.img;
	await playlist.save();

	res.status(200).send({ message: "Updated Successfully" });
});

// add song to playlist
router.put("/add-song", auth, async (req, res) => {
	const schema = Joi.object({
		playlistId: Joi.string().required(),
		songId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.body.playlistId);
	
	if (!user._id.equals(playlist.usrid))
		return res.status(403).send({ message: "User don't have Access to Add!" });

	if (playlist.songs.indexOf(req.body.songId) === -1) {
		playlist.songs.push(req.body.songId);
		await playlist.save();
		res.status(200).send({ data: playlist, message: "Added to Playlist" });
	}
	else
		res.status(200).send({ data: playlist, message: "Already In Playlist" });
});

// remove song from playlist
router.put("/remove-song", auth, async (req, res) => {
	const schema = Joi.object({
		playlistId: Joi.string().required(),
		songId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.body.playlistId);
	if (!user._id.equals(playlist.user))
		return res.status(403)
			.send({ message: "User don't have Access to Remove!" });

	const index = playlist.songs.indexOf(req.body.songId);
	playlist.songs.splice(index, 1);
	await playlist.save();
	res.status(200).send({ data: playlist, message: "Removed from Playlist" });
});

// user playlists
router.get("/favourite", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const playlists = await PlayList.find({ _id: user.playlists });
	// console.log("yay - Fav");
	// console.log(playlists);
	res.status(200).send({ data: playlists });
});

// get random playlists
// router.get("/random", auth, async (req, res) => {
router.get("/random", async (req, res) => {
	const playlists = await PlayList.aggregate([{ $sample: { size: 12 } }]);
	console.log("random");
	res.status(200).send({ data: playlists });
});

// get all playlists
router.get("/a", auth, async (req, res) => {
	const playlists = await PlayList.find();
	res.status(200).send({ data: playlists });
});

// get playlist by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const playlist = await PlayList.findById(req.params.id);
	console.log("g0t playlist by id: " + req.params.id);

	if (!playlist) return res.status(404).send("Not Found!");
	var mongoose = require('mongoose');
	const songs = []
	for (const [index, value] of playlist.songs.entries()) {
		songs[index] = await Song.findById(value);
		JSON.stringify(typeof(value));
	}
	JSON.stringify(songs);
	
	res.status(200).send({ data: { playlist, songs } });
});

// delete playlist by id
router.delete("/:id", [validateObjectId, auth], async (req, res) => {
	console.log("Here");
	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.params.id);
	if (!user._id.equals(playlist.usrid)){
		console.log("NOOO~del");
		return res.status(403).send({ message: "User don't have Access to Delete!" });
	}
	const index = user.playlists.indexOf(req.params.id);
	user.playlists.splice(index, 1);
	await user.save();
	await playlist.remove();

	console.log("--> Deleted Playlist: " + playlist._id);
	res.status(200).send({ message: "Removed from library" });
});

module.exports = router;
