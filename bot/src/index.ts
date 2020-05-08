import dotenv from "dotenv-safe";
import { CookieblobClient } from "./client";
dotenv.config();

const client = new CookieblobClient();

client
	.connectToDB(
		process.env.MONGO_URL || "mongodb://localhost:27017/cookieblob"
	)
	.catch((e) => {
		throw e;
	});

client.login(process.env.TOKEN).catch((e) => {
	throw e;
});
