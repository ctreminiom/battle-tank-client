import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import login from '@/components/auth/login'
import register from '@/components/auth/register'
import dashboard from '@/components/dashboard/dashboard'


Vue.use(Router)
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Logina',
      component: login,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: login,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: register,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: dashboard
    }
    
  ]
})
