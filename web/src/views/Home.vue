<script setup>

    import { ref } from "vue"
    import { io } from "socket.io-client";
    
    const messages = ref([])
    const input = ref("")

    let name = localStorage.getItem('name');
    while (!name) name = prompt("What is your name??\nNOTE: You won't be able to change it.")
    localStorage.setItem('name', name)

    const socket = io({ auth: { name } })

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
</script>

<template>
  <ul>
    <li v-for="msg in messages">
      <template v-if="msg.type == 'system'">
        <i>{{ msg.user }} {{ msg.content }} </i>
      </template>

      <template v-else>
        <b>{{ msg.user }}:</b> {{ msg.content }}
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
