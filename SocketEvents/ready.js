import { EmbedBuilder } from "discord.js";

export default ({ messages, socket, channel, name }) => {
	messages.push({ type: "system", content: "joined the chat!", user: name })
	socket.emit("history", messages)
	socket.broadcast.emit("join", name);
	channel.send({
		embeds: [
			new EmbedBuilder()
				.setColor("Green")
				.setDescription(`${name} joined the chat!`)
		]
	})
}