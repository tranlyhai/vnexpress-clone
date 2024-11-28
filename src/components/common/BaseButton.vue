<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps<{
  type: 'button' | 'submit' | 'reset'
  colorText?: string
  colorBg?: string
  hoverBg?: string
}>()

const { type = 'button', colorText = 'text-black', colorBg = 'bg-slate-50', hoverBg = 'bg-slate-200' } = toRefs(props)
</script>

<template>
  <button
    :type="type"
    class="px-2 py-1 font-medium transition-colors border rounded-md hover:opacity-80 text-sm/6"
    :class="[colorBg, colorText, `hover:${hoverBg}`]"
  >
    <slot />
  </button>
</template>
