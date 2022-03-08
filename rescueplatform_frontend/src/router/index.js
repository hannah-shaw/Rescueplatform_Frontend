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
import FriendChat from '../views/admin/chat/FriendChat.vue'
import AdminInfo from '../views/admin/AdminInfo.vue'
import Test1 from '../views/test/test1.vue'
import Test2 from '../views/test/test2.vue'

Vue.use(VueRouter)

const routes = [
  //用户首页
  {
    path: '/',
    name: 'UserHome',
    component: UserHome,
    meta: { title: "首页" },
    hidden: true
  },
  //发布求助
  {
    path: '/seekhelp',
    name: 'SeekHelp',
    component: SeekHelp,
    meta: { title: "发布求助" },
    hidden: true
  },
  //发布帮助
  {
    path: '/offerhelp',
    name: 'OfferHelp',
    component: OfferHelp,
    meta: { title: "发布帮助" },
    hidden: true
  },
  //求助地图
  {
    path: '/seekmap',
    name: 'SeekMap',
    component: SeekMap,
    meta: { title: "求助信息地图显示" },
    hidden: true
  },
  //帮助地图
  {
    path: '/helpmap',
    name: 'HelpMap',
    component: HelpMap,
    meta: { title: "帮助信息地图显示" },
    hidden: true
  },
  //详情
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: { title: "详情" },
    hidden: true
  },
  //后台登录
  {
    path: '/backlogin',
    name: 'Login',
    component: Login,
    hidden: true
  },
  //后台主页
  {
    path: '/home',
    name: 'BackHome',
    component: BackHome,
    children: [
      {
        path: '/chat',
        name: '在线聊天',
        component: FriendChat,
      },
      {
        path: '/userinfo',
        name: '个人中心',
        component: AdminInfo
      },
      {
        path: '/test1',
        name: 'Test1',
        component: Test1
      },
      {
        path: '/test2',
        name: 'Test2',
        component: Test2
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
