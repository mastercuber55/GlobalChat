import { ref } from "vue"
import { io } from "socket.io-client"

const messages = ref([])

let socket

export function useChat(name) {

  if (!socket) {
    socket = io(
      import.meta.env.DEV
        ? "http://localhost:8080"
        : undefined,
      {
        auth: { name }
      }
    )

    socket.on("history", msgs => {
      messages.value = msgs
    })

    socket.on("message", msg => {
      messages.value.push(msg)
    })

    socket.on("join", name => {
      messages.value.push({
        type: "system",
        user: name,
        content: "joined the chat!"
      })
    })

    socket.on("leave", name => {
      messages.value.push({
        type: "system",
        user: name,
        content: "left the chat!"
      })
    })

    socket.on("connect", () => {
      socket.emit("ready")
    })
  }

  const send = content => {
    if (!content?.trim()) return

    socket.emit("message", content)
  }

  return {
    messages,
    send
  }
}