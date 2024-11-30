<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useClientStore } from '@/stores/client'
import { onMounted, ref } from 'vue'
import type { Category } from '@/types/Category'
import { RouterLink } from 'vue-router'

const clientStore = useClientStore()
const categoryMenu = ref<Category[]>()
const navigation = ref<
  {
    name: string
    href: string
    current: boolean
  }[]
>([])

const getMenu = async () => {
  categoryMenu.value = await clientStore.getCategoryForMenu()
  categoryMenu.value?.forEach((item) => {
    navigation.value?.push({
      name: item.name,
      href: '/category/' + item.slug,
      current: false,
    })
  })
}

onMounted(() => {
  getMenu()
})
</script>

<template>
  <header>
    <div class="flex justify-center w-full p-0 overflow-auto max-h-[250px]">
      <img src="https://zeevector.com/wp-content/uploads/Blue-Banner-Background-HD.png" alt="" />
    </div>
    <div>
      <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <!-- Mobile menu button-->
              <DisclosureButton
                class="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                <XMarkIcon v-else class="block size-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
              <div class="flex items-center shrink-0">
                <RouterLink :to="{ name: 'client-home' }">
                  <img
                    class="w-auto h-8"
                    src="https://s1.vnecdn.net/vnexpress/restruct/i/v9529/v2_2019/pc/graphics/logo.svg"
                    alt="Your Company"
                  />
                </RouterLink>
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <RouterLink
                    v-for="item in navigation"
                    activeClass="bg-gray-900 text-white"
                    :key="item.name"
                    :to="`${item.href}`"
                    class="'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium text-white"
                    >{{ item.name }}</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel class="sm:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              ]"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </header>
</template>

<style lang="css" scoped></style>
