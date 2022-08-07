//引入Vue
import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'
//导入vuex
import store from '@/store'
//注册
Vue.use(VueRouter)

const routes = new VueRouter({
    //配置路由
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/home/home.vue'),
            meta: {title: '首页'}
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/user/index.vue'),
            children: [
                {
                    path: '',
                    name: 'userInfo',
                    component: () => import('@/views/user/right/userInfo.vue'),
                    meta: {title: '个人信息'}
                },
                {
                    path: 'edit_avatar',
                    name: 'editAvatar',
                    component: () => import('@/views/user/right/edit_avatar.vue'),
                    meta: {title: '修改头像'}
                },
                {
                    path: 'edit_phone',
                    name: 'editPhone',
                    component: () => import('@/views/user/right/edit_phone.vue'),
                    meta: {title: '修改手机'}
                },
                {
                    path: 'edit_password',
                    name: 'editPassword',
                    component: () => import('@/views/user/right/edit_password.vue'),
                    meta: {title: '修改密码'}
                },
                {
                    path: 'edit_other',
                    name: 'editOther',
                    component: () => import('@/views/user/right/edit_other.vue'),
                    meta: {title: '修改其他'}
                }
            ]
        },
        {
            path: '/topics',
            name: 'home_',
            component: () => import('@/views/home/home.vue'),
            meta: {title: '社区'}
        },
        {
            path: '/login',
            name: 'login',
            component: ()=> import('@/views/login/login.vue'), //组件名称，这个路由对应跳转的组件
            meta: {title: '登录注册-StoreHouse'}
        },
        {
            path: '/edit',
            name: 'edit',
            component: ()=> import('@/views/userVditor/vditor.vue'), //组件名称，这个路由对应跳转的组件
            meta: {title: '编辑文章-StoreHouse'}
        },
        {
            //板块分类文章列表
            path: '/CategoryTopic/:id',
            name: 'CategoryTopic',
            component: () => import('@/views/category/index.vue'),
        },
        {
            //文章详情页
            path: '/article/:id',
            name: 'article',
            component: ()=> import('@/views/article/index.vue'),
            meta: {title: '文章-StoreHouse'}
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/error/404.vue')
        },
        {
            //未找到页面重定向到404
             path:'*',
             redirect:'/404'
        },
    ],
});

//防止重复点击
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return VueRouterPush.call(this, location).catch(err => err)
} 

//前置路由守卫
routes.beforeEach((to, from, next) => {
    //设置title
    document.title = to.meta.title || 'StoreHouse'
    //判断是否有token
    const token = localStorage.getItem('token')
    if(token){
        //如果有token，则设置isLogin为true
        store.state.isLogin = true
    }
    //动态板块页面标题
    if(to.name === 'CategoryTopic'){
        //设置title
        document.title = store.state.classify+'文章列表-StoreHouse' || 'StoreHouse'
    }
    //放行
    next()
})

//暴露
export default routes;
