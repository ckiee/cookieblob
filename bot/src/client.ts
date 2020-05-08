import CookiecordClient from "cookiecord";
import mongoose from "mongoose";

export class CookieblobClient extends CookiecordClient {
	constructor() {
		super(
			{
				botAdmins: process.env.BOT_ADMINS?.split(","),
				prefix: "cb ",
			},
			{ disableMentions: "everyone" }
		);
		this.loadModulesFromFolder("src/modules");
		if (process.env.NODE_ENVIROMENT !== "production") {
			this.reloadModulesFromFolder("src/modules");
		}
	}
	async connectToDB(url: string) {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
}
