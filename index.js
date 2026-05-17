import express from "express"
import http from "node:http"
import fs from "node:fs"
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from "socket.io"
import { Client, EmbedBuilder, Events, GatewayIntentBits, Webhook, WebhookClient } from "discord.js";
import dotenv from "dotenv"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
})

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));

const messages = []

app.use(express.static(join(__dirname, "web/dist")));	

io.on("connection", async(socket) => {

	const eventsPath = join(__dirname, "SocketEvents")
	const eventFiles = fs.readdirSync(eventsPath)

	const channel = await client.channels.fetch(process.env.CHANNEL)
	const webhook = new WebhookClient({ url: process.env.WEBHOOK })

	let name = socket.handshake.auth.name || "Anonymous"

	for (const file of eventFiles) {
	    const eventName = file.replace(".js", "")

	    const event = await import(`./SocketEvents/${file}`)

	    socket.on(eventName, (...args) => {
	      event.default({ messages, channel, webhook, name, io, socket }, ...args)
	    })
	  }
})

process.on('unhandledRejection', error => {
  if(client.user === undefined) return;

  client.channels.cache.get(client.settings.logchannel)?.send({
    embeds: [new MessageEmbed()
      .setTitle(`❌ | ${error.name}`)
      .setColor('RED')
      .setDescription(t(error.stack?.toString, 2000))
      .setTimestamp()
      .setThumbnail(client.user.avatarURL())
    ]
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

	messages.push(data)
	io.emit("message", data)

})

client.login(process.env.TOKEN)