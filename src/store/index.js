import Vue from 'vue';
//引入Vuex
import Vuex from 'vuex';

//注册
Vue.use(Vuex);

//创建store对象
const store = new Vuex.Store({
    state: {
        //存储用户信息
        userInfo: {
            userNanoId: '',
            userId: '',
        },
        //组件显示隐藏状态管理
        isShow: {
            
        },
        //存储用户登录状态
        isLogin: false,
        //储存根据用户权限设置组件状态
        isAuth: {
            //管理员权限
            admin: false,
            //普通用户权限
            user: true,
        },
        //获取token
        token: '',

        //模块分类名称
        classify: '',

        //文章id
        articleId: '',
    },
});

export default store;