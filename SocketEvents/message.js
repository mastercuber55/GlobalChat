import { AttachmentBuilder } from "discord.js"
import { Filter } from 'bad-words'

const filter = new Filter({ placeHolder: '█' })

export default ({ messages, io, webhook, name, channel }, content) => {

	content = filter.clean(content)

	const data = { type: "chat", content, user: name }
	messages.push(data)
	io.emit("message", data)

	let webhookData = {}

	if(content.length > 500) {
		const file = new AttachmentBuilder(
		  Buffer.from(content),
		  { name: "message.txt" }
		)

		webhookData = { files: [file] }
	} else {
		webhookData = { content }
	}

	webhook.send({
		...webhookData,
		username: name,
		avatarURL: `https://api.dicebear.com/9.x/bottts/png?seed=${encodeURIComponent(name)}`,
		allowedMentions: { parse: [] }
	})

	if (content.includes("@everyone") || content.includes("@here")) {
		channel.send(`-# Bro really tried pinging everyone`)
	}
}