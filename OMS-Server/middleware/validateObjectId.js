const mongoose = require("mongoose");

module.exports = (req, res, next) => {
	console.log("Getting validation: " + req.params.id);
	if (!mongoose.Types.ObjectId.isValid(req.params.id)){
		// console.log("NOOOOOO");
		return res.status(404).send({ message: "Invalid ID." });
	}
	// console.log("Yes");

	next();
};
