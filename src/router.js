import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  base:
    process.env.NODE_ENV === `production`
      ? process.env.VUE_APP_PUBLIC_PATH
      : '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        auth: true,
        adminOnly: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/post-new',
      name: 'post-new',
      component: () => import('./views/PostNew.vue'),
      meta: {
        auth: true,
        adminOnly: true
      }
    },
    {
      path: '/post-update',
      name: 'post-update',
      component: () => import('./views/PostUpdate.vue'),
      meta: {
        auth: true,
        adminOnly: true
      }
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('./views/Manage.vue'),
      meta: {
        auth: true,
        adminOnly: false
      }
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./views/Create.vue'),
      meta: {
        auth: true,
        adminOnly: false
      }
    },
    {
      path: '/update',
      name: 'update',
      component: () => import('./views/Update.vue'),
      meta: {
        auth: true,
        adminOnly: false
      }
    },
    {
      path: '*',
      component: () => import('@/views/404.vue'),
      meta: {
        auth: true,
        adminOnly: false
      }
    }
  ]
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
