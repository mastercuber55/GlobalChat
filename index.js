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
  cors: true
})

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));

const messages = []

app.use(express.static(join(__dirname, "web/dist")));	

const sanitizeName = (input = "") =>
  ((name) =>
    name.length >= 2
      ? name.slice(0, 20)
      : "Anonymous")(
    input
      .normalize("NFKC")
      .replace(/[\u2800\u200B-\u200D\uFEFF]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  )

io.on("connection", async(socket) => {

	const eventsPath = join(__dirname, "SocketEvents")
	const eventFiles = fs.readdirSync(eventsPath)

	const channel = await client.channels.fetch(process.env.CHANNEL)
	const webhook = new WebhookClient({ url: process.env.WEBHOOK })

  socket.data = {
    name: sanitizeName(socket.handshake.auth.name),
    ID: crypto.randomUUID()
  }
  socket.emit("sessionID", socket.data.ID)

	for (const file of eventFiles) {
	    const eventName = file.replace(".js", "")

	    const event = await import(`./SocketEvents/${file}`)

	    socket.on(eventName, (...args) => {
	      event.default({ messages, io, socket, channel, webhook }, ...args)
	    })
	  }

  const message = {
		ID: crypto.randomUUID(),
		sender: {
			ID: "1",
			name: "System"
		},
		content: `${socket.data.name} joined the chat!`,
    type: "system"
	}

	messages.push(message)
	
	socket.emit("history", messages)
	io.emit("message", message);

  channel.send({
		embeds: [
			new EmbedBuilder()
				.setColor("Green")
				.setDescription(`${socket.data.name} joined the chat!`)
		]
	})
})

process.on("unhandledRejection", async (error) => {
  try {
    if (!client.user) return;

    const channel = await client.channels.fetch(process.env.CHANNEL);

    const embed = new EmbedBuilder()
      .setTitle(`❌ | ${error?.name || "Unhandled Rejection"}`)
      .setColor("Red")
      .setDescription(
        `\`\`\`\n${String(error?.stack || error).slice(0, 4000)}\n\`\`\``
      )
      .setTimestamp();

    await channel.send({
      embeds: [embed]
    });

  } catch (err) {
    console.error("Failed to report error:", err);
  }
});

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

  const message = {
		ID: crypto.randomUUID(),
		sender: {
			ID: author.id,
			name: `🌐・${author.username}`
		},
		content,
    type: "chat"
	}

	if(msg.attachments.size != 0)
		message.content += `${message.content ? "\n" : ""}[Message has attachments]`

	messages.push(message)
	io.emit("message", message)

})

client.login(process.env.TOKEN)