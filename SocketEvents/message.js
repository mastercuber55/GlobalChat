export default ({ messages, io, webhook, name }, content) => {
	const data = { type: "chat", content, user: name }
	messages.push(data)
	io.emit("message", data)

	webhook.send({
		content,
		username: name,
		avatarURL: `https://api.dicebear.com/9.x/bottts/png?seed=${encodeURIComponent(name)}`
	})
}