<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from "./views/Header.vue"
</script>

<template>
  <Header/>
  <main class="container-fluid">
    <RouterView />
  </main>
</template>