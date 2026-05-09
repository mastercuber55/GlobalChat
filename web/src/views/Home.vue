<script setup>
    import ChatMessage from "../components/ChatMessage.vue"
    import { useChat } from "../composables/useChat"
    import { useAutoScroll } from "../composables/useAutoScroll"

    import { ref, watch, nextTick } from "vue"

    let name = sessionStorage.getItem('name');
    while (!name) name = prompt("What is your name??")
    sessionStorage.setItem('name', name)

    const input = ref("")
    const chatList = ref(null)
    const { messages, send } = useChat(name)

    useAutoScroll(messages, chatList)

    const submit = () => {
      send(input.value)
      input.value = ""
    }
</script>

<template>
  <ul ref="chatList" class="chat-list">
    <ChatMessage
      v-for="(msg, index) in messages"
      :key="index"
      :msg="msg"
      :index="index"
      :messages="messages"
      :name="name"
    />
  </ul>
    <fieldset role="group">
      <textarea
        v-model="input"
        @keydown.enter.exact.prevent="submit"
        placeholder="Heyyyyyyyyyyyyy!!!!"
      />
      <button @click="submit">Send</button>
    </fieldset> 
</template>
