import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'
import Layout from '../views/Layout/index.vue'
// import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    //路由原信息
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/layout/home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue')
      },
      {
        path: '/layout/goods',
        name: 'Goods',
        component: () => import('../views/Goods/Goods.vue')
      },
      {
        path: '/layout/params',
        name: 'Params',
        component: () => import('../views/Params/Params.vue'),
        redirect: '/layout/params/specifications',
        children: [
          {
            path: '/layout/params/specifications',
            name: 'Specifications',
            component: () => import('../views/Params/package/Specifications.vue')
          }
        ]
      },
      {
        path: '/layout/advert',
        name: 'Advert',
        component: () => import('../views/Advert/Advert.vue')
      },
      {
        path: '/layout/order',
        name: 'Order',
        component: () => import('../views/Order/index.vue'),
        redirect: '/layout/order/list',
        children: [
          {
            path: '/layout/order/list',
            name: 'orderlist',
            component: () => import('../views/Order/Orderlist/index.vue')
          },
          {
            path: '/layout/order/back',
            name: 'orderback',
            component: () => import('../views/Order/Orderback/back.vue')
          }
        ]
      },
      {
        path: '/layout',
        redirect: '/layout/home'
      }
    ]
  },
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/',
    redirect: '/layout'
  }
]

const router = new VueRouter({
  routes
})

export default router
