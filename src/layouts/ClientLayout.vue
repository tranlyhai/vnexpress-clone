<script lang="ts" setup>
import TheHeader from '@/components/clients/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main id="ClientLayout" class="container">
    <slot />
  </main>
</template>

<style lang="css" scoped></style>
