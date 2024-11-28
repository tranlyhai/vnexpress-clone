import { reactive, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { AxiosError, type AxiosInstance } from 'axios'
import Cookies from 'universal-cookie'
import type { responseError } from '@/types/responses'

export const useAdminStore = defineStore('admin', () => {
  const admin = reactive<{
    id: string
    name: string
    email: string
  }>({
    id: '',
    name: '',
    email: '',
  })
  const errors = ref<responseError | Record<string, string[]> | string>('')

  const axios = inject<AxiosInstance>('axios')
  const cookies = new Cookies()
  const router = useRouter()

  async function login(email: string, password: string) {
    if (!axios) return console.error('axios is not available')
    try {
      errors.value = ''
      const res = await axios.post('/auth/login', { email: email, password: password })
      cookies.set('access_token', res.data.data.access_token)
      cookies.set('user_role', res.data.data.user.role)
      admin.id = res.data.data.user.id
      admin.name = res.data.data.user.name
      admin.email = res.data.data.user.email
    } catch (error: unknown) {
      const err = error as AxiosError
      errors.value = err.response?.data as responseError
    }
  }

  async function logout() {
    try {
      await axios?.post('/logout')
      cookies.remove('access_token', {
        path: '/',
      })
      cookies.remove('user_role', {
        path: '/',
      })
      router.push({ name: 'admin-login' })
    } catch (error) {
      console.error('Error occurred while logging out:', error)
    }
  }

  async function getAllCategory() {
    try {
      const res = await axios?.get('/categories')
      return res?.data.data
    } catch (error) {
      console.error('Error occurred while fetching categories:', error)
    }
  }

  async function getOneCategory(id: string) {
    try {
      const res = await axios?.get(`/categories/${id}`)
      return res?.data.data
    } catch (error) {
      console.error('Category is wrong something ', error)
    }
  }

  async function createNewCategory(name?: string, slug?: string) {
    try {
      errors.value = ''
      await axios?.post('/categories', {
        name: name,
        slug: slug,
      })
    } catch (error) {
      console.error('Error occurred while fetching categories:', error)
      const err = error as AxiosError
      errors.value = err.response?.data as responseError
    }
  }

  async function editCategory(id?: string, name?: string, slug?: string) {
    try {
      errors.value = ''
      await axios?.put(`/categories/${id}`, {
        name: name,
        slug: slug,
      })
    } catch (error) {
      console.error('Error occurred while fetching categories:', error)
      const err = error as AxiosError
      errors.value = err.response?.data as responseError
    }
  }

  async function deleteCategory(id?: string) {
    try {
      errors.value = ''
      await axios?.delete(`/categories/${id}`)
    } catch (error) {
      console.error('Error occurred while fetching categories:', error)
      const err = error as AxiosError
      errors.value = err.response?.data as responseError
    }
  }

  async function getAllPost() {
    try {
      const res = await axios?.get('/posts')
      return res?.data.data
    } catch (error) {
      console.error('Error occurred while fetching post:', error)
    }
  }

  async function getOnePost(id: string) {
    try {
      const res = await axios?.get(`/posts/${id}`)
      return res?.data.data
    } catch (error) {
      console.error('Category is wrong something ', error)
    }
  }

  async function createPost(
    title?: string,
    slug?: string,
    short_description?: string,
    description?: string,
    category_ids?: string[],
  ) {
    try {
      errors.value = ''
      await axios?.post(`/posts`, {
        title: title,
        slug: slug,
        short_description: short_description,
        description: description,
        category_ids: category_ids,
      })
    } catch (error) {
      console.error('Category is wrong something ', error)
      const err = error as AxiosError
      errors.value = err.response?.data as responseError
    }
  }

  async function editPost(
    id?: string,
    title?: string,
    slug?: string,
    short_description?: string,
    description?: string,
    category_ids?: string[],
  ) {
    try {
      errors.value = ''
      await axios?.put(`/posts/${id}`, {
        title: title,
        slug: slug,
        short_description: short_description,
        description: description,
        category_ids: category_ids,
      })
    } catch (error) {
      console.error('Category is wrong something ', error)
      const err = error as AxiosError
      errors.value = err.response?.data as responseError
    }
  }

  async function deletePost(id?: string) {
    try {
      errors.value = ''
      await axios?.delete(`/posts/${id}`)
    } catch (error) {
      console.error('Error occurred while fetching categories:', error)
      const err = error as AxiosError
      errors.value = err.response?.data as responseError
    }
  }

  return {
    login,
    logout,
    admin,
    errors,
    getAllCategory,
    getOneCategory,
    createNewCategory,
    editCategory,
    deleteCategory,
    getAllPost,
    getOnePost,
    createPost,
    editPost,
    deletePost,
  }
})
