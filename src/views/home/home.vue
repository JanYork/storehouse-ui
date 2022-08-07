<template>
    <div id="app">
        <banner></banner>
        <div class="navigation">
            <!-- TODE: 导航栏，Vuex通信 -->
            <navigation></navigation>
        </div>
    </div>
</template>

<script>
    //导入组件banner
    import banner from '@/components/banner/banner.vue'
    //导入导航版块组件
    import navigation from '@/components/navigation/index.vue'
    export default {
        components: {
            banner,
            navigation
        }
    }
</script>

<style scoped>
    #app .navigation{
        /*左右边距*/
        margin:auto 200px;
        margin-top: 35px;
    }
</style>