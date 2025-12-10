const socket = io()

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
		const item = document.createElement("li")
		item.innerText = msg
		messages.appendChild(item)
	})
	window.scrollTo(0, document.body.scrollHeight)
})

// THIS DOES NOT FIRE WHEN USING socket.emit, OKAY?
// ITS EMITED ON THE SERVER NOT CLIENT!
socket.on("message", msg => {
	const item = document.createElement("li")
	item.innerText = msg
	messages.appendChild(item)
	window.scrollTo(0, document.body.scrollHeight)
})

input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		e.preventDefault()

		if (!input.value) return
		socket.emit("message", input.value)
		input.value = ""
	}
})