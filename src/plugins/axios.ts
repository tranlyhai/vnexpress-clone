import { type App } from 'vue'
import axios, { type AxiosInstance } from 'axios'
import Cookies from 'universal-cookie'
import { type Router } from 'vue-router'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default {
  install(app: App, options: { router: Router }) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const cookies = new Cookies()


    const refreshCookie = () => {
      cookies.remove('access_token', { path: '/' })
      cookies.remove('user_role', { path: '/' })
      options.router.push({ name: 'login' })
    }

    axiosInstance.interceptors.request.use(
      (config) => {
        const token = cookies.get('access_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // Interceptor để xử lý lỗi
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized! Please login again.')
          refreshCookie()
        }
        return Promise.reject(error)
      },
    )
    app.config.globalProperties.$axios = axiosInstance
    app.provide('axios', axiosInstance)
  },
}
