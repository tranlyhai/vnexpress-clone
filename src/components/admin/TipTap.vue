<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { onBeforeUnmount, toRefs, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: modelValue.value,
  extensions: [StarterKit, Image],
  editorProps: {
    attributes: {
      class: 'w-full min-h-[200px] border ring ring-gray-300 rounded-md p-2',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(modelValue, (newValue) => {
  if (!editor.value) return
  const currentContent = editor.value.getHTML()
  if (currentContent !== newValue) {
    editor.value.commands.setContent(newValue || '', false)
  }
})

onBeforeUnmount(() => {
  editor?.value?.destroy()
})
</script>

<template>
  <editor-content :editor="editor" />
</template>
