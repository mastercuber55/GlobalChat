if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register("sw.js")
		.then(console.log)
		.catch(console.error)
}

const { createApp, ref } = Vue

createApp({
	setup() {
		const messages = ref([])
		const input = ref("")

		let name = localStorage.getItem('name');
		while (!name) name = prompt("What is your name??\nNOTE: You won't be able to change it.")
		localStorage.setItem('name', name)

		const socket = io({ auth: { name } })

		socket.on("history", msgs => messages.value = msgs)
		socket.on("message", msg => messages.value.push(msg))

		socket.on("join", name => messages.value.push({ type: "system", user: name, content: "joined the chat!" }))
		socket.on("leave", name => messages.value.push({ type: "system", user: name, content: "left the chat!" }))

		socket.on("connect", () => socket.emit("ready"))

		const send = () => {
			if(!input.value) return;
			socket.emit("message", input.value)
			input.value = ""
		}

		return { messages, input, send }
	}
}).mount("#app")