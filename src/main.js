import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import AOS from 'aos'
import '../node_modules/aos/dist/aos.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueGtag from 'vue-gtag'
import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(VueAwesomeSwiper)
Vue.use(AOS)

Vue.use(VueGtag, {
  config: {
    id: process.env.VUE_APP_GA
  }
})
swiper.use([Navigation, Pagination, Autoplay])

new Vue({
  router,
  store,
  vuetify,
  created () {
    AOS.init()
  },
  render: h => h(App)
}).$mount('#app')
