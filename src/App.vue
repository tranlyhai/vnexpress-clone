<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
