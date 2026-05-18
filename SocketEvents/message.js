import { AttachmentBuilder } from "discord.js"
import { Filter } from 'bad-words'

const filter = new Filter({ placeHolder: '█' })

export default ({ messages, io, webhook, channel, socket }, content) => {

	content = filter.clean(content)

	const message = {
		ID: crypto.randomUUID(),
		sender: {
			ID: socket.data.ID,
			name: socket.data.name 
		},
		content,
		type: "chat"
	}

	messages.push(message)

	io.emit("message", message)

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
		username: socket.data.name,
		avatarURL: `https://api.dicebear.com/9.x/bottts-neutral/png?seed=${encodeURIComponent(socket.data.ID)}`,
		allowedMentions: { parse: [] }
	})

	if (content.includes("@everyone") || content.includes("@here")) {
		channel.send(`-# Bro really tried pinging everyone`)
	}
}