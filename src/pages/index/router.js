import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Home = resolve => require(['@/pages/index/components/Home'], resolve)
const router = new Router({
  routes:[
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'Home',
      name:'Home',
      component:Home
    },
  ]
})
export default router