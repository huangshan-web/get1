import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './components/Index.vue'
import Search from './components/Search.vue'
import Product from './components/Product.vue'
import Login from './components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Product',
      component: Product
    },
    {
      path: '/Search',
      component: Search
    },
    {
      path: '/Index',
      component: Index
    },

    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
