<template>
    <div>
        <h1><i class="el-icon-lock"></i>修改密码
            <hr>
        </h1>

        <div class="centBox">
        <p>密码</p>
        <el-input v-model="pwdInfo.pwd" placeholder="密码8位数及以上" class="el_input"></el-input>

        <p>确认密码</p>
        <el-input v-model="pwdInfo.pwd2" placeholder="与密码填写一致哦~" class="el_input"></el-input>

        <el-button @click="setPwd" type="primary" class="el_input">应用修改</el-button>
        </div>
    </div>
</template>

<script>
import api from '@/api/api'
export default {
    data() {
        return {
            pwdInfo:{
                pwd: '',
                pwd2: '',
            }
        }
    },
    methods: {
        setPwd(){
            if (this.pwdInfo.pwd != this.pwdInfo.pwd2) {
                this.$message.error('两次密码不一致，请重新填写');
                return;
            }
            api.postFormAPI('/ServletUserInfo?act=getUidUpdatePwd',this.pwdInfo).then(res => {
                if (res.data.code == 200) {
                    this.$message.success(res.data.msg);
                    //清空浏览器缓存
                    localStorage.clear();
                    //跳转到登录页面
                    this.$router.push('/login');
                }else{
                    this.$message.error(res.data.msg);
                }
            });
        }
    },
}
</script>

<style scoped>
h1 {
    font-size: 20px;
}

h1 hr {
    border-color: #ccc;
}

h1 i{
    margin-right: 8px;
}

.el_input{
    margin-bottom: 15px;
}
</style>