import { Message, User } from "discord.js";
import {
	command,
	default as CookiecordClient,
	Module,
	listener,
} from "cookiecord";

export default class UtilModule extends Module {
	constructor(client: CookiecordClient) {
		super(client);
	}
	updatePresence() {
		this.client.user?.setPresence({
			status: "online",
			activity: {
				name: `cb help | ${this.client.guilds.cache.size} servers`,
			},
		});
	}
	@listener({ event: "ready" })
	ready() {
		console.log(`logged in as ${this.client.user?.tag}`);
		this.updatePresence();
		setInterval(() => this.updatePresence(), 1000 * 60 * 5);
	}

	@command({ aliases: ["pong"] })
	async ping(msg: Message) {
		const m = await msg.channel.send("Pong. :ping_pong:");
		await m.edit(
			`Pong. :ping_pong: (Roundtrip: ${
				m.createdTimestamp - msg.createdTimestamp
			}ms | One-way: ${~~this.client.ws.ping}ms)`
		);
	}
}
