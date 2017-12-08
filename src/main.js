// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Auth from '@/packages/auth/auth.js'
import Game from '@/packages/auth/game.js'

import Player01 from '@/packages/auth/player01.js'
import Player02 from '@/packages/auth/player02.js'


Vue.use(Auth)
Vue.use(Game)

Vue.use(Player01)
Vue.use(Player02)


Vue.config.productionTip = false

router.beforeEach(
  (to, from, next) => {

    if(to.matched.some( record => record.meta.forVisitors)) 
    {
      if (Vue.auth.isAuthenticated())
      {
        next({

          path: '/dashboard'
        })
      }
      else next()
    } else next()

  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
