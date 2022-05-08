const mongoose = require("mongoose");
const Joi = require("joi");

const songSchema = new mongoose.Schema({
	name: { type: String, required: true },
	movie: { type: String },
	artist: { type: [String], required: true },
	genre: { type: String },
	isPlaylist: { type: String },
	company: { type: String },
	
	// song: { type: String, required: true },
	// img: { type: String, required: true },
	song: { type: String },
	img: { type: String },
	date: { type: [String], required: true },
	duration: { type: String, required: true },
});

const validate = (song) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		movie: Joi.string().allow(''),
		artist: Joi.array().items(Joi.string().allow('')).required(),
		genre: Joi.string().required(),
		isPlaylist: Joi.string().required().label("zzzz"),
		date: Joi.array().items(Joi.string()).required(),
		company: Joi.string().allow(null),
		// song: Joi.string().required(),
		// img: Joi.string().required(),
		song: Joi.string().allow(null),
		img: Joi.string().allow(null),
		duration: Joi.number().required(),
	});
	return schema.validate(song);
};

const Song = mongoose.model("song", songSchema);

module.exports = { Song, validate };
