<script setup>
import { ref } from "vue";

const chats = ref([
  { name: "Global Chat", avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Global", status: "online" },
  { name: "Cube Nerd", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=CubeNerd", status: "online" },
  { name: "dwip", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=dwip", status: "offline" },
  { name: "Seoli", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Seoli", status: "online" },
  { name: "Echo", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Echo", status: "away" },
  { name: "Nova", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Nova", status: "online" },
  { name: "Zenith", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zenith", status: "offline" },
  { name: "Pixel", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Pixel", status: "online" },
  { name: "CyberBot", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CyberBot", status: "online" },
  { name: "Luna", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna", status: "away" },
  { name: "Vortex", avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Vortex", status: "online" },
  { name: "Ghost", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ghost", status: "offline" },
  { name: "Astra", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Astra", status: "online" },
  { name: "Sparky", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sparky", status: "online" },
  { name: "Nebula", avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Nebula", status: "away" }
]);

const isOpen = ref(true)
</script>

<template>
  <aside :class="{ 'is-open': isOpen }">
    <header>
      <button @click="isOpen = !isOpen">
        {{ isOpen ? "←" : "→" }}
      </button>

      <span>
        Messages
      </span>
    </header>
    <ul>
      <li v-for="chat in chats">
        <img :src="chat.avatar" class="avatar" :alt="chat.name">
        <span>{{ chat.name }}</span>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
aside {

  bottom: 0px;
  width: 80px;
  height: 100%;

  background: var(--pico-code-background-color);
  border-right: 1px solid var(--pico-muted-border-color);

  overflow: hidden;

  transition: width 0.3s ease;
}


button {
  margin: 1rem;

  width: 48px;
  height: 48px;

  padding: 0;

  flex-shrink: 0;
}

header {
  display: flex;
  align-items: center;
}

.is-open {
  width: 300px
}

ul {
  height: 100%;

  margin: 0;
  padding: 0;

  overflow-y: auto;

  list-style: none;
}

li {
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 1rem;

  cursor: pointer;
}

li:hover {
  background: rgba(255, 255, 255, 0.05);
}

img {
  width: 40px;
  height: 40px;

  border-radius: 50%;

  flex-shrink: 0;
}

span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>