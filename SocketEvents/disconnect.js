import { EmbedBuilder } from "discord.js"

export default ({ messages, socket, io, channel }) => {
	
	const message = {
		ID: crypto.randomUUID(),
		sender: {
			ID: "1",
			name: "System"
		},
		content: `${socket.data.name} left the chat!`,
		type: "system"
	}

	io.emit("message", message)
	messages.push(message)

	channel.send({
		embeds: [
			new EmbedBuilder()
				.setColor("Red")
				.setDescription(`${socket.data.name} left the chat!`)
		]
	})
}