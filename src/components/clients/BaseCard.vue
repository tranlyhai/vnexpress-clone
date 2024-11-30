<script setup lang="ts">
import type { Post } from '@/types/Post'
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  post: Post
}>()
const { post } = toRefs(props)
</script>
<template>
  <RouterLink
    class="grid grid-cols-12 gap-2 p-3 transition-colors border-b hover:bg-gray-50"
    :to="{ name: 'client-post', params: { slug: post.slug } }"
  >
    <div class="col-span-12">
      <p class="font-medium" v-text="post.title"></p>
    </div>
    <div class="col-span-3">
      <img src="https://placehold.co/145x87" width="145" height="87" :alt="post.title" />
    </div>
    <div class="col-span-9">
      <p class="line-clamp-3" v-text="post.short_description"></p>
    </div>
  </RouterLink>
</template>
