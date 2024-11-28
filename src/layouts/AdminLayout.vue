<template>
  <TheHeader />
  <main id="adminLayout" class="h-screen ml-[250px] p-4">
    <slot />
  </main>
  <TheFooter />
</template>

<script lang="ts" setup>
import TheFooter from '@/components/admin/TheFooter.vue'
import TheHeader from '@/components/admin/TheHeader.vue'
import Cookies from 'universal-cookie'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const cookies = new Cookies()
const router = useRouter()

watch(
  () => cookies.get('access_token'),
  () => {
    router.push({ name: 'admin-login' })
  },
)
</script>

<style lang="css" scoped>
#adminLayout {
  width: calc(100% - 250px);
}
</style>
