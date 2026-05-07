import { EmbedBuilder } from "discord.js"

export default ({ messages, name, channel, io }) => {
	io.emit("leave", name)
	messages.push({ type: "system", content: "left the chat!", user: name })

	channel.send({
		embeds: [
			new EmbedBuilder()
				.setColor("Red")
				.setDescription(`${name} left the chat!`)
		]
	})
}