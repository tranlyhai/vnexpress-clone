<script lang="ts" setup>
import { computed, toRefs, ref } from 'vue'

const emit = defineEmits(['update:input'])
const props = defineProps<{
  input?: string
  inputType?: string
  name?: string
  id?: string
  placeholder?: string
  disabled?: boolean | string
  required?: boolean | string
}>()
const {
  input,
  inputType,
  name,
  id,
  placeholder,
  disabled = false,
  required = false,
} = toRefs(props)

const isForced = ref(false)

const inputComputed = computed({
  get: () => input?.value || '',
  set: (values: string) => emit('update:input', values),
})
</script>

<template>
  <input
    @focus="isForced = true"
    @blur="isForced = false"
    :type="inputType || 'text'"
    :name="name"
    :id="id"
    class="block w-full border-0 rounded-md py-1.5 pl-7 text-gray-900 ring ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
    :class="isForced ? 'focus:ring-2 focus:ring-inset focus:ring-indigo-600' : ''"
    :placeholder="placeholder"
    v-model="inputComputed"
    :disabled="Boolean(disabled)"
    :required="Boolean(required)"
    data-1p-ignore
  />
</template>
