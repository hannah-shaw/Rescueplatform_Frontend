import Vue from 'vue'
import VueRouter from 'vue-router'

import UserHome from '../views/user/Home.vue'
import SeekHelp from '../views/user/post/CreateSeekPost.vue'
import OfferHelp from '../views/user/post/CreateHelpPost.vue'
import SeekMap from '../views/user/map/SeekMap.vue'
import HelpMap from '../views/user/map/HelpMap.vue'
import Detail from '../views/user/post/Detail.vue'

import BackHome from '../views/admin/Home.vue'
import Login from '../views/admin/Login.vue'


Vue.use(VueRouter)

const routes = [
  //用户首页
  {
    path: '/',
    name: 'UserHome',
    component: UserHome,
    meta: { title: "首页" },
  },
  //发布求助
  {
    path: '/seekhelp',
    name: 'SeekHelp',
    component: SeekHelp,
    meta: { title: "发布求助" },
  },
  //发布帮助
  {
    path: '/offerhelp',
    name: 'OfferHelp',
    component: OfferHelp,
    meta: { title: "发布帮助" },
  },
  //求助地图
  {
    path: '/seekmap',
    name: 'SeekMap',
    component: SeekMap,
    meta: { title: "求助信息地图显示" },
  },
  //帮助地图
  {
    path: '/helpmap',
    name: 'HelpMap',
    component: HelpMap,
    meta: { title: "帮助信息地图显示" },
  },
  //详情
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: { title: "详情" },
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
