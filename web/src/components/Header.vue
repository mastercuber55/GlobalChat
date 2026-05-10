<script setup>
	import { Icon } from "@iconify/vue"
</script>
<template>
	<header class="container-fluid">
    <nav>
      <ul>
        <li><RouterLink to="/"><strong>Enjin - Cube Nerd</strong></RouterLink></li>
      </ul>
      <ul>
        <li><a href="github.com/mastercuber55/GlobalChat" target="_blank"><Icon icon="mdi:github"/></a></li>
        <li><a href="https://www.youtube.com/@mastercoder55" target="_blank"><Icon icon="mdi:youtube"/></a></li>
        <li><a href="https://discord.gg/7zvpWnE7QV" target="_blank"><Icon icon="ic:baseline-discord"/></a></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  position:relative; 
  background: var(--pico-code-background-color);
}
</style>