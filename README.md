# GlobalChat 🌍💬

A simple **real-time global chat app** built with **Express**, **Socket.IO**, and **Vue 3**.
Made as a learning project to understand WebSockets, real-time systems, and PWAs.

🌐 **Live demo:** [Global Chat](https://enjin.onrender.com/)

<img width="1313" height="701" alt="Screenshot from 2026-05-23 11-37-45" src="https://github.com/user-attachments/assets/be8ad582-4e80-4c02-9f5f-c6bac451c137" />

## ✨ Features

* Real-time global chat using **Socket.IO**
* Username chosen on first visit (saved in `localStorage`)
* System messages for user **join / leave**
* Message history on connect
* Send via **Enter** or **Send** button
* Modern UI with **[ShaDCN](https://www.shadcn-vue.com/)**
* Reactive frontend with **Vue 3**
* Censorship for moderation
<!-- * Installable **Progressive Web App** -->

## 🛠 Tech Stack

### Server

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge\&logo=socketdotio\&logoColor=white)

### Client

![Vue.js](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge\&logo=vue.js\&logoColor=white)
![ShaDCN](https://img.shields.io/badge/ShaDCN-5468FF?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🔄 How It Works

1. The client asks for a **user** on first visit and stores it in `localStorage`
2. The browser connects to the Socket.IO server, sending the username during the handshake
3. The server:
   
   * Sends existing messages to the new client
   * Broadcasts a **join** system message
5. When a user sends a message:

   * It is sent to the server
   * Stored in memory ( for now )
   * Broadcast to all connected clients
6. On disconnect, the server broadcasts a **leave** system message
7. Vue updates the UI reactively as messages arrive

## 🚀 Deploying
```sh
git clone https://github.com/mastercuber55/GlobalChat.git
cd GlobalChat
npm install
node index.js
```

## ⚠️ Limitations

* No authentication currently
* Messages stored in RAM only currently
* Single global room for now
* No spam protection
* No markdown support yet

## 📄 License

MIT — free to fork, modify, and learn from.
