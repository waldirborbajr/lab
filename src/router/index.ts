import { createRouter, createWebHashHistory } from 'vue-router'
import BankView from '../views/bank/BankView.vue'

const routes = [
  {
    path: '/',
    name: 'bank',
    component: BankView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
