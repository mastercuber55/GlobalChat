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
	console.log("Someone Connected")

	socket.emit("history", messages)

	socket.on("disconnect", () => {
		console.log("Someone Disconnected")
	})

	socket.on("message", (msg) => {
		messages.push(msg)
		io.emit("message", msg)
	})
})

httpServer.listen(8080, () => {
	console.log("Running at 8080")
})