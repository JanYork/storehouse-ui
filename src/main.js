import Vue from 'vue'
import App from './App.vue'

//引入axios
import axios from 'axios'

//ElementUI引入
import ElementUI from 'element-ui';
//ElementUI的样式引入
import 'element-ui/lib/theme-chalk/index.css';

//导入QS模块
import QS from 'qs'
//全局化QS
Vue.prototype.$qs = QS

//使用ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false

// 导入极验
require('@/assets/js/gt.js');
// 绑定极验初始化方法到原型
Vue.prototype.$initGeet=initGeetest;

//全局引入axios
Vue.prototype.$axios = axios;

//导入路由
import VueRouter from 'vue-router'
import router from './router'
//注册
Vue.use(VueRouter)

//导入vuex文件
import store from './store'

//将window对象挂载到vue原型上
Vue.prototype.$window = window;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
