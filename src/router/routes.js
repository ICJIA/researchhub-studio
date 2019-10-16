export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      auth: true,
      adminOnly: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/post-new',
    name: 'post new',
    component: () => import('@/views/PostNew.vue'),
    meta: {
      auth: true,
      adminOnly: true
    }
  },
  {
    path: '/post-update',
    name: 'post update',
    component: () => import('@/views/PostUpdate.vue'),
    meta: {
      auth: true,
      adminOnly: true
    }
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/Manage.vue'),
    meta: {
      auth: true,
      adminOnly: false
    }
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/Create.vue'),
    meta: {
      auth: true,
      adminOnly: false
    }
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('@/views/Update.vue'),
    meta: {
      auth: true,
      adminOnly: false
    }
  },
  {
    path: '/page-not-found',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      auth: true,
      adminOnly: false
    }
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]
