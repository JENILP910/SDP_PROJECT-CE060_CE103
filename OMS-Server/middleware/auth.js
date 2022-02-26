const jwt = require("jsonwebtoken");
const key = require("../key");
// const config = require('../key');

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res.status(400).send({ message: "Access denied, No token provided." });
	jwt.verify(token, key.jwt.secret, (err, validToken) => {
		if (err)
			return res.status(400).send({ message: "Invalid Token" });
		else {
			req.user = validToken;
			// console.log(req.route);
			next();
		}
	});
};
