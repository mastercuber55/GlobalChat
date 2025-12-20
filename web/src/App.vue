<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container-fluid" style="position: sticky; background: var(--pico-background-color);">
    <nav>
      <ul>
        <li><RouterLink to="/"><strong>Global Chat - Cube Nerd</strong></RouterLink></li>
      </ul>
      <ul>
        <li><a href="https://github.com/mastercuber55" target="_blank">Github</a></li>
        <li><a href="https://www.youtube.com/@mastercoder55" target="_blank">Youtube</a></li>
        <li><a href="https://discord.gg/7zvpWnE7QV" target="_blank">Discord</a></li>
      </ul>
    </nav>
  </header>
<!--   <header>
    <div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header> -->
  <main class="container-fluid">
    <RouterView />
  </main>
</template>