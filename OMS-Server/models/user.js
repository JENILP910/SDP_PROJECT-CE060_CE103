const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const key = require('../key');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	gender: { type: String, required: true },
	date: { type: String, required: true },
	month: { type: String, required: true },
	year: { type: String, required: true },
	likedSongs: { type: [String], default: [] },
	playlists: { type: [String], default: [] },
	isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.name, isAdmin: this.isAdmin },
		process.env.JWTSECRETKEY,
		{ expiresIn: key.jwt.expires }
	);
	return token;
};

const validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(10).required(),
		email: Joi.string().email().required(),
		password: passwordComplexity().required(),
		date: Joi.string().required(),
		month: Joi.string().required(),
		year: Joi.string().required(),
		gender: Joi.string().valid("male", "female").required(),
	});
	return schema.validate(user);
};

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };
