<script setup>
import { Icon } from "@iconify/vue"
import ChatMessage from "@/components/ChatMessage.vue"
import { useChat } from "@/composables/useChat"
import { useAutoScroll } from "@/composables/useAutoScroll"

import { ref } from "vue"

const sanitizeName = (input = "") =>
  (input ?? "")
    .toString()
    .normalize("NFKC")
    .replace(/[\u2800\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9 _-]/g, "")
    .trim()
    .slice(0, 16)

let name = sanitizeName(sessionStorage.getItem("name"))

while (!name || name.length < 4) {
  name = sanitizeName(prompt("What is your name??"))
}

sessionStorage.setItem("name", name)

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
    <main>
        <ul ref="chatList" class="chat-list overflow-auto">
        <ChatMessage v-for="(msg, index) in messages" :key="index" :msg="msg" :index="index" :messages="messages"
            :name="name" />
    </ul>
    <fieldset role="group">
        <textarea v-model="input" @keydown.enter.exact.prevent="submit" placeholder="Heyyyyyyyyyyyyy!!!!" />
        <button @click="submit">
            <Icon icon="prime:send" width="24" height="24" />
        </button>
    </fieldset>
    </main>
</template>

<style scoped>

main {
  flex: 1;

  display: flex;
  flex-direction: column;

  min-width: 0;
  min-height: 0;
}

.chat-list {
    flex: 1;
    min-width: 0;
    height: 75vh;
    margin: 0;
    padding-top: 40px;
    margin-right: 20px;
    margin-left: -20px
}

.chat-list li {
    display: flex;
    flex-direction: column;
}

.chat-list li.me {
    align-items: flex-end;
}

.chat-list li.other {
    align-items: flex-start;
}

.chat-list li.system {
    align-items: center;
}

fieldset {

    width: 100%;
    height: 100px;

    margin: 0;
    padding: 1rem;

    background: var(--pico-background-color);
    box-shadow: none;
}

textarea {
    resize: none;
    scrollbar-width: none;
}

textarea::-webkit-scrollbar {
    display: none;
}
</style>