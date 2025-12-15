let name = localStorage.getItem('name');

while (!name) name = prompt("What is your name??\nNOTE: You won't be able to change it.")

const socket = io({
	auth: { name }
})

localStorage.setItem('name', name)

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register("sw.js")
		.then(console.log)
		.catch(console.error)
}
	
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
	msgs.forEach(msg => appendMessage(msg))
})

// THIS DOES NOT FIRE WHEN USING socket.emit, OKAY?
// ITS EMITED ON THE SERVER NOT CLIENT!
async function appendMessage(msg) {
	const item = document.createElement("li")
	const user = document.createElement("b")
	const content = document.createTextNode(msg.content)

	user.textContent = msg.user + ": "
	item.appendChild(user)
	item.appendChild(content)
	messages.appendChild(item)

	window.scrollTo(0, document.body.scrollHeight)
}

socket.on("message", msg => appendMessage(msg))

socket.on("join", name => {
	appendMessage({user: name, content: "joined the chat!"})
})

socket.on("leave", name => {
	appendMessage({user: name, content: "left the chat!"})
})

input.addEventListener("keydown", async (ev) => {
	if (ev.key === "Enter") {
		ev.preventDefault()

		if (!input.value) return
		socket.emit("message", input.value)
		input.value = ""
	}
})