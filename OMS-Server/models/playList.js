const mongoose = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const playListSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String },
	songs: { type: [String], default: [] },
	img: { type: String },
	usrid: { type: String, ref: "user", required: true },
	usrnm: { type: String, ref: "user",},
});

const validate = (playList) => {
	const schema = Joi.object({
		// id: Joi.string().required(),
		name: Joi.string().required(),
		desc: Joi.string().allow(""),
		songs: Joi.array().items(Joi.string()),
		img: Joi.string().allow(""),
		usrid: Joi.string().required(),
		usrnm: Joi.string().required(),
	});
	return schema.validate(playList);
};

const PlayList = mongoose.model("playList", playListSchema);

module.exports = { PlayList, validate };
