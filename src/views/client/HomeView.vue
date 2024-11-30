<script lang="ts" setup>
import BaseCard from '@/components/clients/BaseCard.vue'
import { useClientStore } from '@/stores/client'
import type { Post } from '@/types/Post'
import { onMounted, ref } from 'vue'

const clientStore = useClientStore()
const posts = ref<Post[]>()

const getPosts = async () => {
  posts.value = await clientStore.getPosts()
}

onMounted(() => {
  getPosts()
})
</script>

<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-6" v-for="(post, index) in posts" :key="index">
      <BaseCard :post="post" />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
