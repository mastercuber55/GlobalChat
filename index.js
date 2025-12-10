import express from "express"
import http from "node:http"

const app = express()
const server = http.createServer(app)

app.get("/", (req, res) => {
	res.send("Haiiiiiii")
})

server.listen(8080, () => {
	console.log("Running at 8080")
})