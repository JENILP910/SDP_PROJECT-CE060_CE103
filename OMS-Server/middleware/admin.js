const jwt = require("jsonwebtoken");
const key = require("../key");


module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");
	// console.log("Token: " + token);
	if (!token) return res.status(400).send("Access denied, no token provided.");

	jwt.verify(token, key.jwt.secret, (err, validToken) => {
		if (err) {
			return res.status(400).send({ message: "Invalid Token" });
		} else {
			if (!validToken.isAdmin)
				return res.status(403)
					.send({ message: "You don't have Access to this Content!" });

			req.user = validToken;
			next();
		}
	});
};
