<template>
  <AuthLayout title="Login to Admin">
    <form class="space-y-6" id="adminLogin" @submit.prevent="handleLogin()">
      <div>
        <label for="email" class="block font-medium text-gray-900 text-sm/6">Email address</label>
        <div class="mt-2">
          <BaseInput
            id="email"
            name="email"
            input-type="email"
            placeholder="Enter your email admin"
            v-model:input="email"
            :class="[
              emailError
                ? 'bg-red-100 ring-red-400 focus:ring-red-600 focus:outline-none focus:border-red-500'
                : '',
            ]"
          />
          <p
            class="w-full mt-2 text-sm font-medium text-red-500 text-"
            v-if="emailError"
            v-text="emailError"
          ></p>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block font-medium text-gray-900 text-sm/6">Password</label>
        </div>
        <div class="mt-2">
          <BaseInput
            id="password"
            name="password"
            input-type="password"
            placeholder="Enter your password admin"
            v-model:input="password"
            :class="[
              passwordError
                ? 'bg-red-100 ring-red-400 focus:ring-red-600 focus:outline-none focus:border-red-500'
                : '',
            ]"
          />
          <p
            class="w-full mt-2 text-sm font-medium text-red-500 text-"
            v-if="passwordError"
            v-text="passwordError"
          ></p>
        </div>
      </div>

      <div :class="status ? 'animate-pulse' : ''">
        <BaseButton
          type="submit"
          colorBg="bg-indigo-600"
          colorText="text-white"
          hoverBg="bg-indigo-500"
          class="w-full"
        >
          Sign in
        </BaseButton>
      </div>
    </form>
  </AuthLayout>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const email = ref<string>('')
const password = ref<string>('')
const status = ref<boolean>(false)

const emailError = ref<string | null>(null)
const passwordError = ref<string | null>(null)
const checkErrs = ref()
const adminStore = useAdminStore()
const router = useRouter()

const handleLogin = async () => {
  emailError.value = ''
  passwordError.value = ''
  status.value = true

  await adminStore.login(email.value, password.value)

  checkErrs.value = adminStore.errors

  if (checkErrs.value) {
    emailError.value = checkErrs.value?.errors.email ? checkErrs.value?.errors?.email[0] : ''
    passwordError.value = checkErrs.value?.errors.password
      ? checkErrs.value?.errors?.password[0]
      : ''
  } else {
    status.value = false
    router.push({ name: 'admin-dashboard' })
  }
}
</script>

<style scoped></style>
