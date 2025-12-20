import express from "express"
import http from "node:http"
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from "socket.io"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

const __dirname = dirname(fileURLToPath(import.meta.url));

const messages = []

app.use(express.static(join(__dirname, "web/dist")));	

io.on("connection", (socket) => {
	
	let name = socket.handshake.auth.name || "Anonymous"

	socket.on("ready", () => {
		messages.push({	type: "system", content: "joined the chat!", user: name})
		socket.emit("history", messages)
		socket.broadcast.emit("join", name);
	})

	socket.on("disconnect", () => {
		io.emit("leave", name)
		messages.push({type: "system", content: "left the chat!", user: name})
	})

	socket.on("message", (msg) => {
		const data = { type: "chat", content: msg, user: name }
		messages.push(data)
		io.emit("message", data)
	})
})

httpServer.listen(8080, () => {
	console.log("Running at 8080")
})