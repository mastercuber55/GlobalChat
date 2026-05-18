import { reactive } from "vue"
import { io } from "socket.io-client"

let socket: any = null

export const session = reactive({
  ID: "",
  name: "",
})

export function useSocket(name: string) {
    if(!socket) {
        socket = io(import.meta.env.DEV ? `http://${window.location.hostname}:8080` : undefined, { auth: { name } })

        session.name = name

        socket.on("sessionID", (ID: string) => {
            session.ID = ID
        })
    }

    return socket
}