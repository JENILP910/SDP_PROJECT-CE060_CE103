const router = require("express").Router();
const { Song } = require("../models/song");
const { PlayList } = require("../models/playList");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
	const search = req.query.search;
	if (search !== "") {
		// if(search == "@s"){
		// 	const asongs = await Song.find().limit(10);
		// 	const playlists = await PlayList.find().limit(0);
		// 	const result = { asongs, playlists };
		// 	res.status(200).send(result);
		// }
		// else{
			let song = await Song.find({
				name: { $regex: search, $options: "i" },
			}).limit(8);
			const song0 = song.sort((a, b) => a.name.localeCompare(b.name));
			// const song0 = song.sort((a, b) => b.name - a.name);
			
			song = await Song.find({
				artist: { $regex: search, $options: "i" },
			}).limit(8);
			const song1 = song.sort((a, b) => a.artist.localeCompare(b.artist));

			song = [...song0, ...song1];

			const songs = song.filter((ele, ind) => {
				// console.log("ind: " + ind + " elem-id: " + ele._id);
				let res = (song.findIndex( elem => {
					// console.log("ele-id: " + ele._id + " elem-id: " + elem._id);
					return ele._id.equals(elem._id)
				} ))
				// console.log("\t" + res);
				return res == ind;
			});
			// const songs = Array.from(new Set(song));
			// console.log(song.length);
			console.log("Search ret: " + songs.length);
			
			const playlists = await PlayList.find({
				name: { $regex: search, $options: "i" },
			}).limit(10);

			const result = { songs, playlists };
			res.status(200).send(result);
		// }
	} else {
		res.status(200).send({});
	}
});

module.exports = router;
