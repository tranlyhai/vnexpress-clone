<script lang="ts" setup>
const { title } = defineProps<{
  title: string;
}>()
</script>

<template>
  <section>
    <div class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="w-auto h-10 mx-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9" v-text="title"></h2>
      </div>

      <main class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <slot />
      </main>
    </div>
  </section>
</template>

<style lang="css" scoped></style>
