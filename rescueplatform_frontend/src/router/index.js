import Vue from 'vue'
import VueRouter from 'vue-router'

import UserHome from '../views/user/Home.vue'
import SeekHelp from '../views/user/post/CreateSeekPost.vue'

import BackHome from '../views/admin/Home.vue'
import Login from '../views/admin/Login.vue'


Vue.use(VueRouter)

const routes = [
  //用户首页
  {
    path: '/',
    name: 'UserHome',
    component: UserHome,
  },
  //发布求助
  {
    path: '/seekhelp',
    name: 'SeekHelp',
    component: SeekHelp,
  },
  //后台登录
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  //后台主页
  {
    path: '/home',
    name: 'BackHome',
    component: BackHome,
    
  }

]

const router = new VueRouter({
  routes
})

export default router
