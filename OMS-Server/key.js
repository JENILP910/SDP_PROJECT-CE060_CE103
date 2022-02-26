const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '/.env') });

module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	mongoose: {
		uri: process.env.MONGO_URI + (process.env.NODE_ENV === 'test' ? '-test' : ''),
		options: {
			// useCreateIndex: true,
			// useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
	},
	jwt: {
		secret: process.env.JWTSECRETKEY,
		expires: process.env.JWT_EXPIRES,
	},
};