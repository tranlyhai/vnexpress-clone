import { inject } from 'vue'
import { defineStore } from 'pinia'
import { AxiosError, type AxiosInstance } from 'axios'
import type { responseError } from '@/types/responses'

export const useClientStore = defineStore('client', () => {
  const axios = inject<AxiosInstance>('axios')

  function getCategoryForMenu() {
    if (!axios) return console.error('axios is not available')
    return axios
      .get('/client/categories')
      .then((response) => response.data.data)
      .catch((error: AxiosError<responseError>) => console.error(error.message))
  }
  function getPosts() {
    if (!axios) return console.error('axios is not available')
    return axios
      .get('/client/posts')
      .then((response) => response.data.data)
      .catch((error: AxiosError<responseError>) => console.error(error.message))
  }
  function getOnePost(slug?: string) {
    if (!axios) return console.error('axios is not available')
    return axios
      .get('/client/posts/' + slug)
      .then((response) => response.data.data)
      .catch((error: AxiosError<responseError>) => console.error(error.message))
  }
  function getPostByCategory(slug?: string) {
    if (!axios) return console.error('axios is not available')
    return axios
      .get('/client/categories/'+slug)
      .then((response) => response.data.data)
      .catch((error: AxiosError<responseError>) => console.error(error.message))
  }

  return {
    getCategoryForMenu,
    getPosts,
    getOnePost,
    getPostByCategory,
  }
})
