import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import ProductManagement from '@/components/ProductManagement.vue'
import OrderManagement from '@/components/OrderManagement.vue'
import ReviewManagement from '@/components/ReviewManagement.vue'
import OrderInfoCard from '@/components/OrderInfoCard.vue'
import OrderDetailPage from '@/components/OrderDetailPage.vue'
import ReviewManage from '@/components/ReviewManage.vue'
import MainpageManage from '@/components/MainpageManage.vue'
import Profile from '@/components/Profile.vue'

Vue.use(VueRouter)

const authority = {
  isAdmin (to, from, next) {
    const loginUser = store.state.user
    if (loginUser.id && loginUser.role !== 'admin') {
      next({ name: 'NotFound' })
    } else if (!loginUser) {
      next({ name: 'Login' })
    }
    next()
  },
  isUser (to, from, next) {
    const loginUser = store.state.user
    if (loginUser.id && loginUser.role !== 'user') {
      next({ name: 'NotFound' })
    } else if (!loginUser.id) {
      next({ name: 'Login' })
    }
    next()
  },
  isConfirmCheckout (to, from, next) {
    const loginUser = store.state.user
    const processCheckout = store.state.processCheckout
    if (loginUser.id && !processCheckout) {
      next({ name: 'Cart' })
    } else if (!loginUser) {
      next({ name: 'Login' })
    }
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  },
  {
    path: '/user',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserProfile.vue'),
    beforeEnter: authority.isUser,
    children: [
      {
        path: 'purchase/:status',
        name: 'Purchase',
        component: OrderInfoCard
      },
      {
        path: 'purchase/:status/:orderId',
        name: 'OrderDetail',
        component: OrderDetailPage
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ]
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Checkout.vue'),
    beforeEnter: authority.isConfirmCheckout
  },
  {
    path: '/navigation/:navigation',
    name: 'Navigation',
    component: () => import(/* webpackChunkName: "Navigation" */ '../views/Navigation.vue')
  },
  {
    path: '/products/:navigation/:category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "Category" */ '../views/Category.vue')
  },
  {
    path: '/products/:productId',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "ProductDetail" */ '../views/ProductDetail.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/AdminMainPage.vue'),
    beforeEnter: authority.isAdmin,
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "Admin" */ '../views/AdminMainPage.vue')
      },
      {
        path: 'product-management',
        name: 'product-management',
        component: ProductManagement
      },
      {
        path: 'order-management',
        name: 'order-management',
        component: OrderManagement
      },
      {
        path: 'user/:userId/order/:orderId',
        name: 'AdminOrderDetail',
        component: OrderDetailPage
      },
      {
        path: 'mainpage-management',
        name: 'mainpage-management',
        component: MainpageManage
      },
      {
        path: 'review-management',
        component: ReviewManagement,
        children: [
          {
            path: '',
            name: 'review-management',
            component: ReviewManage // default child path
          },
          {
            path: ':type',
            name: 'Reviews',
            component: ReviewManage
          }
        ]
      }
    ]
  },
  // {
  //   path: '/admin/review-management/:type',
  //   name: 'Reviews',
  //   component: () => import(/* webpackChunkName: "Admin" */ '../views/AdminMainPage.vue'),
  //   beforeEnter: authority.isAdmin
  // },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

export default router
