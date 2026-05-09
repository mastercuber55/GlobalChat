import { watch, nextTick } from "vue"

export function useAutoScroll(messages, chatList) {

  watch(messages, async () => {
    if (!chatList.value) return

    const threshold = 100

    const shouldScroll =
      chatList.value.scrollTop +
      chatList.value.clientHeight >=
      chatList.value.scrollHeight - threshold

    await nextTick()

    if (shouldScroll) {
      chatList.value.scrollTop =
        chatList.value.scrollHeight
    }

  }, { deep: true })

}