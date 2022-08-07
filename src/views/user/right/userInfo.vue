<template>
    <div>
        <h1><i class="el-icon-user"></i>修改资料
            <hr>
        </h1>
        <p>用户名</p>
        <el-input v-model="userInfo.name" placeholder="用户名只能修改两次，请谨慎操作" class="el_input"></el-input>

        <p>邮箱</p>
        <el-input v-model="userInfo.email" placeholder="如：name@website.com" class="el_input"></el-input>

        <p>个人网站</p>
        <el-input v-model="userInfo.path" placeholder="注意：需要http://或https://" class="el_input"></el-input>


        <p>个人简介</p>
        <el-input type="textarea" v-model="userInfo.description" :rows="4" placeholder="一句话介绍你自己" class="el_input">
        </el-input>

        <el-button type="primary" @click="setInfo" plain class="el_input">应用修改</el-button>
    </div>
</template>

<script>
import api from '@/api/api'
export default {
    data() {
        return {
            userInfo:{
                name: '',
                email: '',
                path: '',
                description: '',
            }
        }
    },
    methods: {
        setInfo(){
            //判断网址是否合法
            if(this.userInfo.path != ''){
                if(!this.userInfo.path.match(/^(http|https):\/\//)){
                    this.$message.error('请输入合法的网址');
                    return;
                }
            }
            api.postFormAPI('/ServletUserInfo?act=getUidUpdateUserInfo',this.userInfo).then(res => {
                if (res.data.code == 200) {
                    this.$message.success(res.data.msg);
                    //将数据更新到localStorage中
                    localStorage.setItem('name',this.userInfo.name);
                    
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

.el_input {
    margin-bottom: 15px;
}

</style>