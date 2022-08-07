<template>
    <div>
        <div @click="setThumbs">
            <el-tooltip class="toolItem" effect="dark" content="点赞" placement="right-start">
                <i class="el-icon-star-on"></i>
            </el-tooltip>
        </div>

        <div @click="toEmail">
            <el-tooltip class="toolItem" effect="dark" content="举报" placement="right-start">
                <i class="el-icon-s-release"></i>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    import api from '@/api/api'
    export default {
        data() {
            return {
                articleId: '',
            }
        },
        methods: {
            toEmail() {
                //跳转到邮箱
                window.location.href = 'mailto:747945307@qq.com';
            },
            setThumbs() {
                //获取路由中的id
                this.articleId = this.$route.params.id;
                api.postFormAPI('/thumbsPush', {
                    articleId: this.articleId
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            },
        },
    }
</script>

<style>
    .toolItem{
        z-index: 999;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        color: #4298ef;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center; 
        align-items: center;
        margin-top: 10px;
        cursor: pointer;
        font-size: 20px;
        transition: all 0.6s ease-in-out;
    }

    .toolItem:hover{
        box-shadow: 0 0 6px rgba(25,137,250);
        color: #1989fa;
        transition: all 0.8s ease-in-out;
    }
</style>