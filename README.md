# GlobalChat 🌍💬

GlobalChat is a simple real-time global chat application built using
**Express** and **Socket.IO**.  
It’s designed as a learning project to understand WebSockets,
client–server communication, and basic real-time systems.

Live demo: https://globalchat-sdmz.onrender.com/

## Features

- Real-time messaging using Socket.IO
- Global chat room (all users see all messages)
- Message history sent on connect
- Send messages via button or `Enter` key
- Minimal, no-framework frontend

## Tech Stack

### Server
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

### Client
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Socket.IO Client](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

## How It Works

### Connection Flow

1. Client connects to the Socket.IO server
2. Server sends existing message history ( from RAM currently )
3. Client renders past messages
4. New messages are broadcast to all connected clients

## Client-Side Logic

```js
const socket = io()
````

* Establishes a WebSocket connection to the server

### Sending Messages

Messages can be sent in two ways:

* Clicking the **Send** button
* Pressing the **Enter** key

```js
socket.emit("message", input.value)
```

This sends the message to the server — **not directly to other clients**.

### Receiving Message History

```js
socket.on("history", msgs => {
  msgs.forEach(msg => {
    const item = document.createElement("li")
    item.innerText = msg
    messages.appendChild(item)
  })
})
```

* Fired once on connection
* Used to sync past messages

### Receiving New Messages

```js
socket.on("message", msg => {
  const item = document.createElement("li")
  item.innerText = msg
  messages.appendChild(item)
})
```

> ⚠️ NOTE:
> This event **does not fire when `socket.emit()` is called on the client**.\
> It only fires when the **server broadcasts** the message using `io.emit()`.\
> I'll be honest, it was kinda confusing for me 😭
---

## Server-Side Logic

### Message Storage

```js
const messages = []
```

* Messages are stored **in memory**
* They reset when the server restarts
* stupid but works for now.

### On Client Connection

```js
socket.emit("history", messages)
```

* Sends existing messages to the newly connected client

### On Message Event

```js
socket.on("message", (msg) => {
  messages.push(msg)
  io.emit("message", msg)
})
```

Flow:

1. Receive message from one client
2. Store it in memory
3. Broadcast it to **all clients**, including the sender

## Running Locally

```sh
# Clone the repository
git clone https://github.com/mastercuber55/GlobalChat
cd GlobalChat

# Install dependencies
npm install

# Start the server
node index.js

# Server will be available at:
# http://localhost:8080
```

## Deployment Notes

* The backend requires a **persistent server**
* This is why it’s hosted on **Render**
* Platforms like **Vercel** are not suitable for Socket.IO servers
  
## Limitations & Future Improvements

- No authentication → add user accounts and usernames
- No true message persistence → persist messages using Redis or a database
- No rooms or private chats → support multiple rooms and private messaging
- No spam protection → add basic rate limiting and anti-spam checks
- Minimal UI/UX → improve layout, styling, and accessibility


## License

MIT — feel free to fork, modify, and learn from it.
