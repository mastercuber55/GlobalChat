<script setup>
const props = defineProps({
  msg: Object,
  index: Number,
  messages: Array,
  name: String
})

const showUsername = () => {
  if (props.index === 0) return true

  const prev = props.messages[props.index - 1]

  if (prev.type === "system") return true

  return prev.user !== props.msg.user
}

const messageClass = () => {
  if (props.msg.type === "system") return "system"

  return props.msg.user === props.name
    ? "me"
    : "other"
}
</script>

<template>
  <li :class="messageClass()">
    <template v-if="msg.type === 'system'">
      <div class="system-message">
        <i>{{ msg.user }} {{ msg.content }}</i>
      </div>
    </template>

    <template v-else>
      <div class="message-group">
        <small
          v-if="showUsername()"
          class="username"
        >
          {{ msg.user }}
        </small>

        <template v-if="msg.content.length > 500">
          <details class="long-message">
            <summary>
              {{ msg.content.slice(0, 60) }}
              <span class="expand-hint">
                ... click to expand
              </span>
            </summary>

            <article class="message">
              {{ msg.content }}
            </article>
          </details>
        </template>

        <template v-else>
          <article class="message">
            {{ msg.content }}
          </article>
        </template>
      </div>
    </template>
  </li>
</template>

<style scoped>

.message {
  padding: 10px;
  border-radius: 8px;
  margin: 0px
}

.username {
  display: block;
  margin-bottom: 0.25rem;
  opacity: 1;
}

</style>