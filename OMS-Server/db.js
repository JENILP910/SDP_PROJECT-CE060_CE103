const mongoose = require("mongoose");
const config = require('./key');

module.exports = async () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		// await mongoose.connect(process.env.DB, connectionParams);
		mongoose.connect(config.mongoose.uri, config.mongoose.options);
		console.log("connected to database successfully");
	} catch (error) {
		console.log("could not connect to database.");
		console.log();
		console.log(error);
	}
};
