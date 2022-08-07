<template>
  <el-submenu index="0" :popper-append-to-body="false">
    <template slot="title" id="logoItem">
      <img src="https://a.ideaopen.cn/JanYork/ATqi9g5q.png" width='26px' height='26px'>
      <span class="site-name">StoreHouse</span>
    </template>
  
    <el-menu-item @click="toHome" index="2-1">回到首页</el-menu-item>
    <el-menu-item index="2-2" @click="userEdit">用户设置</el-menu-item>
    <el-menu-item index="2-3" @click="outline">退出登录</el-menu-item>
  </el-submenu>
</template>

<script>
export default {
    methods: {
        toHome() {
            this.$router.push('/');
        },
        userEdit() {
            this.$router.push('/user');
        },
        outline() {
            localStorage.clear();
            window.location.reload();
        }
    }
}
</script>

<style scoped>
  .site-name{
    font-size: 1.5rem !important;
    font-weight: bold !important;
    margin-left: 1rem !important;
    color: #888888 !important;
  }
</style>