import Vue from 'nativescript-vue'
import Login from './components/Login.vue'

import VueDevtools from 'nativescript-vue-devtools'
import store from './store'
import VueSocketIO from 'vue-socket.io'


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://projet-api-uf.herokuapp.com',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

new Vue({
  store,
  render: h => h('frame', [h(Login)])
}).$start()
