import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'universal-cookie'


const routes = [
  {
    path: '/',
    name: 'client-home',
    component: () => import('@/views/client/HomeView.vue'),
  },
  {
    path: '/category/:slug',
    name: 'client-slug',
    component: () => import('@/views/client/CategoryView.vue'),
  },
  {
    path: '/post/:slug',
    name: 'client-post',
    component: () => import('@/views/client/PostView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'categories',
        name: 'admin-category',
        component: () => import('@/views/admin/AdminCategory.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'posts',
        name: 'admin-post',
        component: () => import('@/views/admin/AdminPost.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/admin/AdminLogin.vue'),
    meta: { requiresNoAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const cookies = new Cookies()
  const accessToken = cookies.get('access_token')
  const userRole = cookies.get('user_role')

  if (to.meta.requiresNoAuth && accessToken) {
    if (userRole === 1) {
      return next({ name: 'admin-dashboard' })
    }
  }

  if (to.meta.requiresAuth && !accessToken) {
    return next({ name: 'login' })
  }

  next()
})

export default router
