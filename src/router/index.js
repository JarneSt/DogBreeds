import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchComponent from "../components/SearchComponent";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: SearchComponent
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
