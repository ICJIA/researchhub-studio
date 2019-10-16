import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store/index'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

const auth = store.state.auth

router.beforeEach((to, from, next) => {
  NProgress.start()
  store.dispatch('content/clearAll')

  if (sessionStorage.getItem('token') !== null && !auth.isLoggedIn) {
    store.dispatch('auth/loginUsingToken')
  }

  if (to.meta.auth) {
    if (auth.isLoggedIn) {
      if (auth.role !== 'Administrator' && to.meta.adminOnly) {
        next('/')
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } else if (auth.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
