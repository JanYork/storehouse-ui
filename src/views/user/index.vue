<template>
    <div>
        <banner></banner>
        <div class="container">
            <el-card class="leftCard" >
                <ul class="nav">
                    <li @click="editInfo"><i class="el-icon-user"></i>个人信息</li>
                    <li @click="editAvatar"><i class="el-icon-picture-outline"></i>修改头像</li>
                    <li @click="editTel"><i class="el-icon-mobile-phone"></i>绑定手机</li>
                    <li @click="editPassword"><i class="el-icon-lock"></i>修改密码</li>
                    <li @click="editOther"><i class="el-icon-setting"></i>其他设置</li>
                </ul>
            </el-card>

            <el-card class="rightCard">
                <router-view></router-view>
            </el-card>
        </div>
        
    </div>
</template>

<script>
import $ from 'jquery'
import banner from '@/components/banner/banner.vue'

    export default {
        components: {
            banner
        },
        data() {
            return {
            }
        },
        methods: {
            editInfo() {
                this.changeColor();
                this.$router.push({
                    name: 'userInfo'
                })
            },
            editAvatar() {
                this.changeColor();
                this.$router.push({
                    name: 'editAvatar'
                })
                this.backColor();
            },
            editTel() {
                this.changeColor();
                this.$router.push({
                    name: 'editPhone'
                })
            },
            editPassword() {
                this.changeColor();
                this.$router.push({
                    name: 'editPassword'
                })
            },
            editOther() {
                this.changeColor();
                this.$router.push({
                    name: 'editOther'
                })
            },
            changeColor() {
                //获取当前点击的元素
                var $this = $(event.target);
                //获取所有的兄弟元素
                var $siblings = $this.siblings();
                //改变所有的兄弟元素的背景色
                $siblings.css('background-color', '#ffffff');
                //改变当前点击的元素的背景色
                $this.css('background-color', 'rgba(0,0,0,.05)');
            },
        },
    }
</script>

<style scoped>
    .container{
        margin: 0 200px;
        margin-top: 30px;
    }
    .leftCard{
        width: 300px;
        float: left;
    }
    .leftCard >>> .el-card__body{
        padding: 0;
    }
    .rightCard >>> .el-card__body{
        padding: 0;
    }
    .rightCard{
        width: 820px;
        margin-left: 20px;
        float: left;
        padding: 10px 25px;
        height: 556px;
    }

    .nav{
        padding: 0px;
    }
    .nav li{
        list-style: none;
        text-align: center;
        padding: 14px;
        border-bottom: 1px solid rgba(0,0,0,0.15);
    }
    .nav li:first-child{
        background-color: rgba(0,0,0,.05);
    }
    .nav li:hover{
        transition-duration:0.5s;
        background-color: rgba(0,0,0,.035);
    }
    .nav i{
        font-size: 20px;
        vertical-align: middle;
        margin-right: 5px;
        margin-bottom: 2.5px;
    }
</style>