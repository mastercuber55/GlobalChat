<script setup>

    import { ref } from "vue"
    import { io } from "socket.io-client";
    
    const messages = ref([])
    const input = ref("")

    let name = sessionStorage.getItem('name');
    while (!name) name = prompt("What is your name??")
    sessionStorage.setItem('name', name)

    const socket = io(import.meta.env.DEV ? "http://localhost:8080" : undefined,
      {
        auth: { name }
      }
    )

    socket.on("history", msgs => messages.value = msgs)
    socket.on("message", msg => messages.value.push(msg))

    socket.on("join", name => messages.value.push({ type: "system", user: name, content: "joined the chat!" }))
    socket.on("leave", name => messages.value.push({ type: "system", user: name, content: "left the chat!" }))

    socket.on("connect", () => socket.emit("ready"))

    const send = () => {
      if(!input.value) return;


      socket.emit("message", input.value)
      input.value = ""
    }

    const showUsername = (msg, index) => {
      if (index === 0) return true

      const prev = messages.value[index - 1]

      if (prev.type === 'system') return true;

      return prev.user !== msg.user
    }

    const messageClass = msg => {
      if (msg.type === "system") return "system"

      return msg.user === name
        ? "me"
        : "other"
    }
</script>

<template>
  <ul class="chat-list">
    <li v-for="(msg, index) in messages" :class="messageClass(msg)">
      <template v-if="msg.type == 'system'">
        <div class="system-message">
          <i>{{ msg.user }} {{ msg.content }} </i> 
        </div>
      </template>   

      <template v-else>
        <div class="message-group">
          <small v-if="showUsername(msg, index)" class="username">
            {{ msg.user }}
          </small>
          <div class="bubble">
            {{ msg.content }}
          </div>
        </div>
      </template> 
    </li>
  </ul>
    <fieldset role="group">
      <input
        v-model="input"
        @keydown.enter="send"
        placeholder="Heyyyyyyyyyyyyy!!!!"
      />
      <button @click="send">Send</button>
    </fieldset> 
</template>
