// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueI18n from 'vue-i18n'
import VueLocalStorage from 'vue-localstorage'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App'
import router from './router'
import messages from './i18n'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false

Vue.use(VueFire)
Vue.use(VueLocalStorage)
Vue.use(VueAwesomeSwiper)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  template: '<App/>',
  components: { App },
  localStorage: {
    lang: {
      type: String,
      default: 'en'
    },
    dharma: {
      type: Object,
      default: {
        record: {}
      }
    },
    blog: {
      type: Object,
      default: {
        category: '',
        key: ''
      }
    },
    event: {
      type: Object,
      default: {
        category: '',
        key: ''
      }
    }
  }
}).$mount('#app')
