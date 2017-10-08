import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import DharmaMaster from '@/components/dharma/Master.vue'
import DharmaDetail from '@/components/dharma/Detail.vue'
import Events from '@/components/Events.vue'
import BlogMaster from '@/components/blog/Master.vue'
import BlogDetail from '@/components/blog/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/dharma', name: 'DharmaMaster', component: DharmaMaster },
    { path: '/dharma/:key', name: 'dharmaDetail', component: DharmaDetail },
    { path: '/events', name: 'Events', component: Events },
    { path: '/blog', name: 'BlogMaster', component: BlogMaster },
    { path: '/blog/:key', name: 'blogDetail', component: BlogDetail },
    { path: '*', component: Home }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
