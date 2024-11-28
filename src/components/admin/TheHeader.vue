<template>
  <header class="h-screen bg-slate-600 w-[250px] text-white fixed left-0 top-0">
    <div
      id="logo"
      class="flex flex-row justify-center py-2 bg-white border-b border-r border-slate-400"
    >
      <RouterLink to="/admin" class="text-xl font-medium">
        <img
          src="https://s1.vnecdn.net/vnexpress/restruct/i/v9528/v2_2019/pc/graphics/logo.svg"
          alt=""
        />
      </RouterLink>
    </div>
    <div
      id="profile"
      class="flex flex-row items-center justify-center gap-2 py-2 border-b border-slate-400"
    >
      <img src="https://placehold.co/200x200" class="rounded-full" width="40" alt="avatar" />
      <RouterLink class="transition-opacity hover:opacity-70" to="/admin"
        >Hello {{ adminStore.admin.name }}</RouterLink
      >
    </div>

    <div id="menu" class="mt-3">
      <nav>
        <ul>
          <li>
            <RouterLink
              to="/admin/dashboard"
              class="flex gap-2 p-2 mb-2 transition-colors hover:bg-slate-500"
              active-class="bg-slate-500"
            >
              <IconDashboard />
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/categories"
              class="flex gap-2 p-2 mb-2 transition-colors hover:bg-slate-500"
              :class="RouteName.includes('category') ? 'bg-slate-500' : ''"
            >
              <IconCategory />
              <span>Categories</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/posts"
              class="flex gap-2 p-2 mb-2 transition-colors hover:bg-slate-500"
              :class="RouteName.includes('post') ? 'bg-slate-500' : ''"
            >
              <IconPost />
              <span>Post</span>
            </RouterLink>
          </li>
          <li>
            <button
              @click="adminStore.logout()"
              type="button"
              class="flex items-center justify-center w-full gap-2 p-2 mt-2 border-t hover:bg-slate-500"
            >
              <IconLogout />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import IconCategory from '../icons/IconCategory.vue'
import IconDashboard from '../icons/IconDashboard.vue'
import IconPost from '../icons/IconPost.vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import IconLogout from '../icons/IconLogout.vue'

const adminStore = useAdminStore()
const route = useRoute()
const RouteName = route.name as string

</script>

<style scoped></style>
