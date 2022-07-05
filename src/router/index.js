import { createRouter, createWebHistory } from 'vue-router'
import Products from "@/views/Products";
import Order from "@/views/Order";

const routes = [
  {
    path: '/',
    name: 'products',
    component: Products
  },
  {
    path: '/cart',
    name: 'Order',
    component: Order
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
