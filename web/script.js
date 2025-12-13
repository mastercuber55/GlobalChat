const name = prompt("WHAT IS YOUR NAME?!")
const socket = io({
	auth: {	name }
})

const messages = document.getElementById("messages");
const input = document.getElementById("messageToSend")
const submit = document.getElementById("sendMessage")

submit.addEventListener("click", () => {
	if (!input.value)
		return

	socket.emit("message", input.value)
	input.value = ""
})

socket.on("history", msgs => {
	msgs.forEach(msg => {
		const { user, content } = msg;
		appendMessage(`<strong>${msg.user}:</strong>${msg.content}`)
	})
})

// THIS DOES NOT FIRE WHEN USING socket.emit, OKAY?
// ITS EMITED ON THE SERVER NOT CLIENT!
function appendMessage(txt) {
	const item = document.createElement("li")
	item.innerHTML = txt
	messages.appendChild(item)
	window.scrollTo(0, document.body.scrollHeight)
}

socket.on("message", msg => {
	appendMessage(`<b>${msg.user}:</b>${msg.content}`)
})

socket.on("join", name => {
	appendMessage(`<strong>${name}:</strong>joined the chat!`)
})

socket.on("leave", name => {
	appendMessage(`<strong>${name}:</strong>left the chat!`)
})

input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		e.preventDefault()

		if (!input.value) return
		socket.emit("message", input.value)
		input.value = ""
	}
})