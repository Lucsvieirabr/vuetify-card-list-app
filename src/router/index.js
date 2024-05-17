import { createWebHistory, createRouter } from 'vue-router'
import { supabase } from "../lib/supabaseClient";
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'

const routes = [
  { path: '/', component: LoginView, name: 'login' },
  { path: '/home', component: HomeView, name: 'home' },
  {path: '/reset-password', component: ResetPasswordView, name: 'reset-password'},
]

const router = createRouter({
   history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { data: { user } } = await supabase.auth.getUser()

  const routeExists = routes.some(({ name }) => name === to.name)

  if (!routeExists) {
    return next({ name: user ? 'home' : 'login' })
  }

  if (to.name === 'login' && user) {
    return next({ name: 'home' })
  }

  if (to.name !== 'login' && !user) {
    return next({ name: 'login' })
  }

  if (to.name === 'reset-password' && !user) {
    return next({ name: 'login' })
  }
  
  return next()
})
export default router