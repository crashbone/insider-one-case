import { createRouter, createWebHistory } from 'vue-router'
// NO HOME YET
// import Home from '../pages/Home.vue'
import Template from '../pages/Template/Template.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Template
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
