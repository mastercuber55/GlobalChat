import express from "express"
import http from "node:http"
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from "socket.io"
import { Client, EmbedBuilder, Events, GatewayIntentBits, Webhook, WebhookClient } from "discord.js";
import dotenv from "dotenv"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));

const messages = []

app.use(express.static(join(__dirname, "web/dist")));	

io.on("connection", async(socket) => {
	const channel = await client.channels.fetch(process.env.CHANNEL)
	const webhook = new WebhookClient({ url: process.env.WEBHOOK })
	
	let name = socket.handshake.auth.name || "Anonymous"

	socket.on("ready", () => {
		messages.push({	type: "system", content: "joined the chat!", user: name})
		socket.emit("history", messages)
		socket.broadcast.emit("join", name);
		channel.send({ embeds: [
			new EmbedBuilder()
				.setColor("Green")
				.setDescription(`${name} joined the chat!`)
		] })
	})

	socket.on("disconnect", () => {
		io.emit("leave", name)
		messages.push({type: "system", content: "left the chat!", user: name})

		channel.send({ embeds: [
			new EmbedBuilder()
				.setColor("Red")
				.setDescription(`${name} left the chat!`)
		] })
	})

	socket.on("message", (content) => {
		const data = { type: "chat", content, user: name }
		messages.push(data)
		io.emit("message", data)

		webhook.send({
			content,
			username: name,
			avatarURL: `https://api.dicebear.com/9.x/bottts/png?seed=${encodeURIComponent(name)}`
		})
	})
})

client.once(Events.ClientReady, async(readyClient) => {
	console.log(`Logged in as ${readyClient.user.tag}`)
	const channel = await client.channels.fetch(process.env.CHANNEL)
	
	httpServer.listen(8080, async() => {
		const embed = new EmbedBuilder()
			.setDescription("✅ The application is now online")
			.setColor("Green")
		channel.send({ embeds: [embed] })
	})

})

client.on(Events.MessageCreate, msg => {
	if(msg.channel.id != process.env.CHANNEL || msg.webhookId || msg.author.bot) return;
	const { content, author } = msg
	const data = { type: "chat", content, user: "🌐" + author.username }

	if(msg.attachments.size != 0)
		data.content += "\n[Message has attachments]"

	io.emit("message", data)

})

client.login(process.env.TOKEN)