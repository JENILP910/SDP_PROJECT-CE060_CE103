const router = require("express").Router();
const { Song } = require("../models/song");
const { PlayList } = require("../models/playList");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
	const search = req.query.search;
	const filter = req.query.sf;
	if (search !== "") {
		// console.log(req.query);
		// if(search == "@s"){
		// 	const asongs = await Song.find().limit(10);
		// 	const playlists = await PlayList.find().limit(0);
		// 	const result = { asongs, playlists };
		// 	res.status(200).send(result);
		// }
		// else{
			var song, fsong, Search = search;
// console.log(filter);
			switch (filter) {
				case "Year":
					console.log("Year~");
					fsong = await Song.find({
						date: { $regex: Search, $options: "i" },
					}).limit(10);
					fsong = fsong.sort((a, b) => a.name.localeCompare(b.name))
					break;
					
				default:
					break;
			}

			if(Search[0] == "$"){
				console.log("genre~");
				song = await Song.find({
					genre: { $regex: Search.substring(2, Search.length), $options: "i" },
				}).limit(10);

			}

			// console.log("-->" + isNaN(search));
			else if(!isNaN(Search) && Search.length == 4){
				// console.log("here~");
				song = await Song.find({
					date: { $regex: Search, $options: "i" },
				}).limit(10);
				const song3 = song.sort((a, b) => a.artist[0].localeCompare(b.artist[0]));
			}

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			else{
				song = await Song.find({
					movie: { $regex: Search, $options: "i" },
				}).limit(10);
				// console.log(song.length);
				const song0 = song.sort((a, b) => a.name.localeCompare(b.name));
				
				song = await Song.find({
					name: { $regex: Search, $options: "i" },
				}).limit(10);
				// console.log(song.length);
				const song1 = song.sort((a, b) => a.name.localeCompare(b.name));
				// const song0 = song.sort((a, b) => b.name - a.name);
				
				song = await Song.find({
					artist: { $regex: Search, $options: "i" },
				}).limit(10);
				// console.log(song.length);
				const song2 = song.sort((a, b) => a.artist[0].localeCompare(b.artist[0]));
				
				fsong 	? song = [...song0, ...song1, ...song2, ...fsong]
						: song = [...song0, ...song1, ...song2];
			}
			// song = [fsong];
			// song.concat(fsong);
			console.log(fsong);
			console.log(song.length);

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
			console.log(song.length);
			console.log("Search ret: " + songs.length);
			
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			const playlists = await PlayList.find({
				name: { $regex: Search, $options: "i" },
			}).limit(10);

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

			const result = { songs, playlists };
			res.status(200).send(result);
		// }
	} else {
		res.status(200).send({});
	}
});

module.exports = router;
