<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
// =================== Admin Layout =========================
import TheAdminFooter from '@/components/admin/TheFooter.vue'
import TheAdminHeader from '@/components/admin/TheHeader.vue'
// =================== Client Layout =========================
import TheClientHeader from '@/components/clients/TheHeader.vue'

const route = useRoute()
</script>

<template>
  <section
    class="h-screen ml-[250px] p-4"
    id="AdminLayout"
    v-if="(route.name as string)?.includes('admin')"
  >
    <TheAdminHeader />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <TheAdminFooter />
  </section>

  <section id="ClientLayout" v-if="(route.name as string)?.includes('client')">
    <TheClientHeader />
    <main class="container">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </section>

  <section id="AuthLayout" v-if="(route.name as string) === 'login'">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>
