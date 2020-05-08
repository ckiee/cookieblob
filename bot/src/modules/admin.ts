import {
	command,
	CommonInhibitors,
	default as CookiecordClient,
	Module,
} from "cookiecord";
import { Message } from "discord.js";
import { inspect } from "util";

const CODEBLOCK = "```";

export default class AdminModule extends Module {
	constructor(client: CookiecordClient) {
		super(client);
	}

	redactToken(s: string) {
		if (!this.client.token) return s;
		return s.split(this.client.token).join("[bot token]");
	}

	@command({
		single: true,
		inhibitors: [CommonInhibitors.botAdminsOnly],
		onError: (m, e) => {
			m.channel.send(
				`:warning: error occured!\n${CODEBLOCK}diff\n${e.message
					.toString()
					.split("\n")
					.map((x) => `- ${x}`)}\n${CODEBLOCK}`
			);
		},
	})
	async eval(msg: Message, code: string) {
		const res = await (eval(`async () => {
			return ${code}
		}`) as Function).call(this);
		const txt = this.redactToken(inspect(res, false, 2, false));
		if (txt.length > 1950) {
			console.log(res);
			throw new Error(
				`too big, logged the output to console.. (${txt.length}/2000)`
			);
		} else {
			msg.channel.send(`${CODEBLOCK}js\n${txt}\n${CODEBLOCK}`);
		}
	}
}
