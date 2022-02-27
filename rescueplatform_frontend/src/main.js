import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//自定义样式
import '@/assets/app.css'
import { postRequest } from "./utils/api";
import { putRequest } from "./utils/api";
import { getRequest } from "./utils/api";
import { deleteRequest } from "./utils/api";
import { initMenu } from './utils/menus';
//font-awesome
import 'font-awesome/css/font-awesome.css'

//文件下载
import { downloadRequest } from './utils/download'

//时间格式
import relativeTime from 'dayjs/plugin/relativeTime';
// 国际化
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');
// 相对时间插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance
Vue.prototype.dayjs = dayjs;//可以全局使用dayjs



Vue.use(Buefy)
Vue.use(ElementUI);

Vue.use(BMap, {
  // ak 是在百度地图开发者平台申请的** 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'm6hbNoEYyz8YrEzAL7oh3RL2RYE6gGKf'
})

Vue.config.productionTip = false
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.downloadRequest = downloadRequest;

router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store);
    if (!window.sessionStorage.getItem('user')) {
      //  判断用户信息是否存在
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user', JSON.stringify(resp));
          // this.$store.commit('INIT_ADMIN', resp);
          //store.commit("INIT_ADMIN", resp);
          next();
        }
      });
    }
    next();
  } else {
    if (to.path == '/') {
      next();
    } else {
      next('/?redirect=' + to.path)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
