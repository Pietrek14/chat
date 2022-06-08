import { SMTPClient, config } from "../deps.ts";

const emailConfig = {
	connection: {
		hostname: config().EMAIL_HOST,
		port: parseInt(config().EMAIL_PORT),
		auth: {
			username: config().EMAIL_USER,
			password: config().EMAIL_PASSWORD,
		},
	},
};

const emailClient = new SMTPClient(emailConfig);

export default emailClient;
