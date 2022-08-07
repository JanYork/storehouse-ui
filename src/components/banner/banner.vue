<template>
    <div id="banner">
        <el-menu text-color="#8897A7" :default-active="activeIndex" class="el-menu-nav" mode="horizontal" @select="handleSelect" background-color="#FFFFFF" >
            <bannerLogo class="bannerLogo"></bannerLogo>
            <el-menu-item index="2" @click="tobbs">社区</el-menu-item>
            <el-menu-item index="3" @click="toVue">前端</el-menu-item>
            <el-menu-item index="4" @click="toJava">后端</el-menu-item>

            <el-menu-item class="loginItem login-info" @click="login" v-show="!isLogin">
            <i class="el-icon-s-custom"></i>注册
            </el-menu-item>

            <el-menu-item class="loginItem" @click="login" v-show="!isLogin">
            <i class="el-icon-s-promotion"></i>登录
            </el-menu-item>

            <el-menu-item class="userAdmin" v-show="isLogin" @click="toUser">
            <el-avatar :size="28" :src="circleUrl"></el-avatar>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import bannerLogo from "@/components/banner/bannerLogo.vue"
export default {
    components: {
        bannerLogo
    },
    data() {
        return {
            activeIndex: '1',
            isLogin: this.$store.state.isLogin,
            circleUrl: localStorage.getItem('circleUrl'),
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        login() {
            this.$router.push('/login');
        },
        toUser() {
            this.$router.push('/user');
        },
        tobbs() {
            //如果程序员板块更改了路径，需要更改这里
            //访问路由/CategoryTopic/10并同时刷新页面数据
            this.$router.push('/CategoryTopic/10');
            this.$store.dispatch('getArticle');
        },
        toVue() {
            this.$router.push('/CategoryTopic/3');
        },
        toJava() {
            this.$router.push('/CategoryTopic/1');
        }
    }
}
</script>

<style scoped>
    .el-menu-nav{
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }
    
    .loginItem,.userAdmin{
        float: right;
    }
    .login-info{
        margin-right: 80px;
    }
    .btn{
        color: rgb(136, 151, 167);
    }
    .bannerLogo{
        margin-left: 180px;
    }
</style>