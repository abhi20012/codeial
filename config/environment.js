const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');

// const logDirectory = path.join(__dirname, '../production_logs');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


// const accessLogStream = rfs.createStream('access.log', {
//     interval: '1d',
//     path: logDirectory
// });


const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'demoKey',
    db: 'codeial-development-again',
    smtp: {
		service:'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure:false,
		auth: {
			user: 'kashyapabhinav777@gmail.com',
			pass: 'vhhvtnahcovepynm'
		}
	},
	google_client_id: "187656538192-hs3d1k53inue3q29bkld1hldt08kvc7e.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}
// module.exports = development;
// module.exports = production;

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
