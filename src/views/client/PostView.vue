<script lang="ts" setup>
import { useClientStore } from '@/stores/client'
import type { Post } from '@/types/Post'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const clientStore = useClientStore()
const post = ref<Post>()
const route = useRoute()

const getPosts = async () => {
  post.value = await clientStore.getOnePost(route.params.slug as string)
}

onMounted(() => {
  getPosts()
})
</script>

<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12">
      <h1 class="text-3xl font-medium" v-text="post?.title"></h1>
    </div>
    <div class="col-span-12">
      <div class="text-justify description" v-html="post?.description"></div>
    </div>
  </div>
</template>

<style lang="css">
.description img {
  margin: auto;
}
</style>
