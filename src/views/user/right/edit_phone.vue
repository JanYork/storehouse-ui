<template>
    <div>
        <h1><i class="el-icon-mobile-phone"></i><span>{{title}}</span>
            <hr>
        </h1>

        <p>填写手机号码：</p>
        <el-input v-model="form.phone" placeholder="填写手机号码" class="el_input" :disabled="show"></el-input>

        <p>填写验证码：</p>
        <div class="codeBox">
            <el-input v-model="form.code" placeholder="填写验证码" class="el_input"></el-input>
            <span @click="getCode">{{ spanMsg }}</span>
        </div>

        <el-button @click="setPhone" type="primary" class="el_input">绑定手机</el-button>

        <!-- 极验 -->
        <Geet :isGeet="isgt" @geetPath="GeetPath" @clickChange="GeetChange"></Geet>
    </div>
</template>

<script>
import Geet from '@/components/geetest/Geet.vue';
import api from '@/api/api'
export default {
    components: {
        Geet
    },
    data() {
        return {
            title: '绑定手机',
            spanMsg: '获取验证码',
            //极验触发参数
            isgt: false,
            //验证码倒计时与获取验证码Axios触发参数
            isCode: false,
            show:false,
            form: {
                phone: '',
                code: '',
            },
        }
    },
    methods: {
        getCode() {
            if(this.form.phone == ''){
                this.$message.error('请填写手机号码');
                return;
            }else if (typeof this.spanMsg == 'number') {
                this.$message.error('请勿频繁获取');
                return;
            }else{
                this.isgt = true;
            }
        },
        // 极验图片加载之后，通过更改控制变量实现可以再次加载
        GeetChange(val) {
            this.isgt = val;
        },
        GeetPath(val) {
            console.log("4,接受到图形验证参数，将参数发往服务端进行验证");
            console.log(val);
            if (val.status == 1) {
                if (this.spanMsg == '获取验证码') {
                    this.isCode = true;
                } else {
                    this.$message({
                        showClose: true,
                        message: '极验未知错误',
                        type: 'error',
                        duration: 1000,
                        customClass: 'TimeMessage'
                    });
                }
            }
            this.isgt = false;
        },
        setPhone() {
            if(this.form.phone == ''){
                this.$message.error('请填写手机号码');
                return;
            }else if (this.form.code == '') {
                this.$message.error('请填写验证码');
                return;
            }else{
                api.postFormAPI('/setPhone', {
                    phone: this.form.phone,
                    code: this.form.code
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                        if (localStorage.getItem('phone')) {
                            localStorage.setItem('phone', this.form.phone);
                        } else {
                            localStorage.setItem('phone', this.form.phone);
                        }
                        window.setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }
        },
    },
    mounted() {
        if (localStorage.getItem('phone')) {
            this.form.phone = localStorage.getItem('phone');
            this.show = true;
            this.title = '修改手机';
        }
    },
    watch: {
        isCode(val) {
            if (val == true) {
                api.postFormAPI('/phoneCode', {
                    value: this.form.phone,
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: '验证码已发送，请查收',
                            type: 'success',
                            duration: 2000,
                        });
                        //计数器
                        this.spanMsg = 120;
                        //定时器，每秒-1
                        this.timer = window.setInterval(() => {
                            this.spanMsg--;
                            if (this.spanMsg <= 1 || isNaN(this.spanMsg)) {
                                //清除定时器
                                clearInterval(this.timer);
                                this.spanMsg = '获取验证码';
                                this.isCode = false;
                                //使#StoreHouse失去焦点
                                $('#StoreHouse').blur();
                            }
                        }, 1000);
                    }
                });
            }
        },
    },
};

</script>

<style scoped>
h1 {
    font-size: 20px;
}

h1 hr {
    border-color: #ccc;
}

h1 i {
    margin-right: 8px;
}

.el_input {
    margin-bottom: 15px;
}

.codeBox {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.codeBox span {
    display: inline-block;
    margin-left: 10px;
    min-width: 79px;
    color: #409EFF;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    transition: all .5s;
}

.codeBox span:hover {
    color: #0d7be8;
    transition: all .5s;
}
</style>