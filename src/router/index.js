import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/home/Home.vue')
    },
    {
      path: '/favor',
      component: () => import('@/views/favor/Favor.vue')
    },
    {
      path: '/order',
      component: () => import('@/views/order/Order.vue')
    },
    {
      path: '/message',
      component: () => import('@/views/message/Message.vue'),
      meta: { hiddeTabBar: true }
    },
    {
      path: '/city',
      component: () => import('@/views/city/City.vue'),
      meta: { hiddeTabBar: true }
    },
    {
      path: '/search',
      component: () => import('@/views/search/Search.vue'),
      meta: { hiddeTabBar: true }
    },
    {
      path: '/detail/:id',
      component: () => import('@/views/detail/Detail.vue'),
      meta: { hiddeTabBar: true }
    }
  ]
})

export default router
