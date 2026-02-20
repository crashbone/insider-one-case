import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Template from '../pages/Template.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/template',
    name: 'Template',
    component: Template
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
