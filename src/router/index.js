import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import login from '@/components/auth/login'
import register from '@/components/auth/register'


Vue.use(Router)
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Logina',
      component: login
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/register',
      name: 'Register',
      component: register
    }
  ]
})
