import express from "express"
import http from "node:http"
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from "socket.io"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

const __dirname = dirname(fileURLToPath(import.meta.url));

const messages = []

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/web/index.html")
})

app.get("/script.js", (req, res) => {
	res.sendFile(__dirname + "/web/script.js")
})

io.on("connection", (socket) => {
	
	let name = socket.handshake.auth.name || "Anonymous"

	socket.emit("history", messages)

	io.emit("join", name);
	messages.push({content: "joined the chat", user: name})

	socket.on("disconnect", () => {
		io.emit("leave", name)
		messages.push({content: "left the chat", user: name})
	})

	socket.on("message", (msg) => {
		const data = { content: msg, user: name }
		messages.push(data)
		io.emit("message", data)
	})
})

httpServer.listen(8080, () => {
	console.log("Running at 8080")
})