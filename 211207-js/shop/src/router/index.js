import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '購物商城'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '購物商城 | 關於'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    meta: {
      title: '購物商城 | 商品'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      title: '購物商城 | 購物車'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
    meta: {
      title: '購物商城 | 找不到頁面'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
