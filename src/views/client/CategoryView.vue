<script lang="ts" setup>
import BaseCard from '@/components/clients/BaseCard.vue'
import { useClientStore } from '@/stores/client'
import type { Post } from '@/types/Post'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const clientStore = useClientStore()
const posts = ref<Post[]>()
const route = useRoute()

const getPosts = async () => {
  posts.value = await clientStore.getPostByCategory(route.params.slug as string)
}

watch(
  () => route.params.slug,
  () => {
    getPosts()
  },
)

onMounted(() => {
  getPosts()
})
</script>

<template>
  <TransitionGroup tag="div" class="grid grid-cols-12 gap-6 mt-8" name="categoryView">
    <div
      class="col-span-6"
      v-for="(post, index) in posts"
      :key="index"
      :style="{ transitionDelay: `${index * 200}ms` }"
    >
      <BaseCard :post="post" />
    </div>
  </TransitionGroup>
</template>

<style lang="css" scoped>
.categoryView-enter-active {
  transition: all 1s ease;
}
.categoryView-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.categoryView-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.categoryView-leave-active {
  transition: all 1s ease;
}
.categoryView-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.categoryView-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
