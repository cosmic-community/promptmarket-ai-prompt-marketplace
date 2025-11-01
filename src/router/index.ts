import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Prompts from '@/views/Prompts.vue'
import PromptDetail from '@/views/PromptDetail.vue'
import Categories from '@/views/Categories.vue'
import Dashboard from '@/views/Dashboard.vue'
import Analytics from '@/views/Analytics.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/prompts',
    name: 'Prompts',
    component: Prompts
  },
  {
    path: '/prompts/:slug',
    name: 'PromptDetail',
    component: PromptDetail
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router