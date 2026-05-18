<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { Card, CardContent } from './components/ui/card';
import { ref, nextTick, watch } from "vue"
import { Button } from './components/ui/button';
import { ChevronRight } from "lucide-vue-next"
import { useSocket, session } from "@/composables/useSocket.js"
import { ScrollArea } from './components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './components/ui/collapsible'

const sanitizeName = (input: string | null | undefined = "") =>
  (input ?? "")
    .toString()
    .normalize("NFKC")
    .replace(/[\u2800\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9 _-]/g, "")
    .trim()
    .slice(0, 16)

let name = sanitizeName(localStorage.getItem("name"))

while (!name || name.length < 4) {
  name = sanitizeName(prompt("What is your name??"))
}

localStorage.setItem("name", name)

type Message = {
  ID: string
  sender: {
    ID: string
    name: string
  }
  content: string,
  type: "chat" | "system"
}

const socket = useSocket(name)
const scrollArea = ref()
const input = ref("")
const textarea = ref()
const messages = ref<Message[]>([])

socket.on("message", (message: Message) => {
  messages.value.push(message)
})

socket.on("history", (history: Message[]) => {
  messages.value = history
})

function sendMessage() {

  if (input.value.trim() == "")
    return

  socket.emit("message", input.value)
  input.value = ""
}

watch(() => messages.value.length, async () => {

  const viewport = scrollArea.value?.$el?.querySelector(
    '[data-slot="scroll-area-viewport"]'
  )

  if (!viewport) return

  const threshold = 100

  const wasNearBottom =
    viewport.scrollTop +
    viewport.clientHeight >=
    viewport.scrollHeight - threshold

  await nextTick()

  if (wasNearBottom) {
    viewport.scrollTop = viewport.scrollHeight
  }
})

async function autoResizeTextarea() {
  await nextTick()

  textarea.value.style.height = "0px"
  textarea.value.style.height = textarea.value.scrollHeight + "px"
}

function isSameSender(i: number) {
  if (i === 0) return false
  return messages.value[i].sender.ID === messages.value[i - 1].sender.ID
}

function isLongMessage(content: string) {
  return content.length > 300 || content.split("\n").length > 8
}

</script>

<template>
  <div class="flex flex-col w-dvw h-dvh">
    <Navbar />
    <div class="flex-1 p-2 min-h-0">
      <Card class="w-full h-full p-2 flex flex-col">
        <CardContent class="flex-1 p-0 min-h-0">
          <ScrollArea ref="scrollArea" class="h-full w-full">
            <div class="p-4 space-y-1 flex flex-col">
              <div v-for="(message, index) in messages" :key="message.ID" class="flex">

                <div v-if="message.type === 'system'" class="w-full flex justify-center">
                  <div class="text-xs text-muted-foreground bg-transparent px-2 py-1">
                    {{ message.content }}
                  </div>
                </div>

                <div v-else class="flex w-full"
                  :class="message.sender.ID != session.ID ? 'justify-start' : 'justify-end'">
                  <div class="flex flex-col max-w-[70%]">

                    <small v-if="!isSameSender(index)" class="px-1 mb-1 text-muted-foreground"
                      :class="message.sender.ID != session.ID ? 'text-left' : 'text-right'">
                      {{ message.sender.name }}
                    </small>

                    <Collapsible v-if="isLongMessage(message.content)" class="max-w-full">

                      <div class="px-3 py-2 rounded-2xl" :class="message.sender.ID != session.ID
                        ? 'bg-accent text-foreground'
                        : 'bg-primary text-primary-foreground'">
                        <CollapsibleContent forceMount class="data-[state=closed]:max-h-32 overflow-hidden">
                          <div class="break-words whitespace-pre-line">
                            {{ message.content }}
                          </div>
                        </CollapsibleContent>
                      </div>

                      <CollapsibleTrigger as-child>
                        <Button variant="ghost" size="sm" class="h-7 px-2 text-xs mt-1">
                          Show more
                        </Button>
                      </CollapsibleTrigger>

                    </Collapsible>

                    <span v-else class="px-3 py-2 rounded-2xl break-words whitespace-pre-line" :class="message.sender.ID != session.ID
                      ? 'bg-accent text-foreground'
                      : 'bg-primary text-primary-foreground'">
                      {{ message.content }}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </ScrollArea>
        </CardContent>
        <CardFooter class="flex gap-2 shrink-0">
          <textarea class="border-2 rounded-(--radius) flex-1 min-h-12 max-h-16 resize-none transition-all duration-500"
            ref="textarea" v-model="input" @input="autoResizeTextarea" @keydown.enter.exact.prevent="sendMessage" />
          <Button class="self-stretch h-full aspect-square" @click="sendMessage">
            <ChevronRight />
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
