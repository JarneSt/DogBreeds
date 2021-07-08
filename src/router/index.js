import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchComponent from "../components/SearchComponent";
import About from "../views/About";

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
  {
    path: '/about',
    name: 'about',
    component: About
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
