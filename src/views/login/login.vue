<template>
    <div class="container">
        <section id="formHolder">
            <div class="row">
                <!-- Brand Box -->
                <div class="col-sm-6 brand">
                    <a href="#" class="logo">Store <span>.</span></a>

                    <div class="heading">
                        <h2>House</h2>
                        <p>简洁舒适的交流社区</p>
                    </div>
                    <div class="success-msg">
                        <p>Great! 你现在已经成为StoreHouse的成员了。</p>
                        <a href="javascript:void(0);" class="profile" @click="toHome">前往首页</a>
                    </div>
                </div>
                <!-- Form Box -->
                <div class="col-sm-6 form">
                    <!-- Login Form -->
                    <div class="login form-peice switched">
                        <form class="login-form" action="#" method="post">
                            <div class="form-group">
                                <label for="loginValue">{{ login.loginLabel }}</label>
                                <input type="text" name="loginValue" id="loginValue" class="loginValue"
                                    v-model="login.value" required />
                                <span class="error"></span>
                            </div>

                            <div class="form-group">
                                <label for="loginPassword">{{ login.pwdValue }}</label>
                                <input @focus="pwdInputFocus" type="password" name="loginPassword" id="loginPassword"
                                    class="loginPassword" v-model="login.pwd" required />
                                <span class="error"></span>
                            </div>

                            <div class="CTA">
                                <input @click="loginInfo" type="submit" value="登录" />
                                <a href="#" class="switch">我需要注册</a>
                            </div>
                        </form>
                    </div>
                    <!-- End Login Form -->

                    <!-- Signup Form -->
                    <div class="signup form-peice">
                        <form class="signup-form" action="#" method="post">
                            <div class="form-group">
                                <label for="name">你的昵称</label>
                                <input type="text" name="username" id="name" class="name" v-model="form.account" />
                                <span class="error"></span>
                            </div>

                            <div class="form-group">
                                <label for="email">邮件地址</label>
                                <input type="email" name="emailAdress" id="email" class="email" v-model="form.email" />
                                <span class="error"></span>
                            </div>

                            <div class="form-group">
                                <label for="verCode">{{ labelTime }}</label>
                                <input @focus="codeInputFocus" type="text" name="verCode" id="StoreHouse"
                                    class="verCode" v-model="form.code" />
                                <span class="error"></span>
                            </div>

                            <div class="form-group">
                                <label for="password">你的密码</label>
                                <input type="password" name="password" id="password" class="pass"
                                    v-model="form.password" />
                                <span class="error"></span>
                            </div>

                            <div class="form-group">
                                <label for="passwordCon">重复密码</label>
                                <input type="password" name="passwordCon" id="passwordCon" class="passConfirm" v-model="form.password2" />
                                <span class="error"></span>
                            </div>
                            <div class="CTA">
                                <input type="submit" value="完成注册" id="submit" @click="enrollInfo" />
                                <a href="#" class="switch">我已拥有StoreHouse账户</a>
                            </div>
                        </form>
                    </div>
                    <!-- End Signup Form -->
                </div>
            </div>
        </section>

        <footer>
            <p>
                Form by:
                <a href="" target="_blank">StoreHouse</a>
            </p>
        </footer>
        <!-- 极验 -->
        <Geet :isGeet="isgt" @geetPath="GeetPath" @clickChange="GeetChange"></Geet>
    </div>
</template>

<script>
import api from '@/api/api'
//取消所有submit按钮的点击事件的提交
$(document).on('submit', 'form', function (e) {
    e.preventDefault()
})
$(document).ready(function () {
    'use strict';
    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }

    // Label effect
    $('input').focus(function () {
        $(this).siblings('label').addClass('active');
    });

    // Form validation
    $('input').blur(function () {
        // User Name
        if ($(this).hasClass('name')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('请输入你的昵称').fadeIn().parent('.form-group').addClass('hasError');
                // 使用正则判断输入的昵称是否符合 [a-zA-Z0-9_-][-\w]{3}
            } else if ($(this).val().length > 1 && $(this).val().length <= 3) {
                $(this).siblings('span.error').text('请输入4个字符及以上').fadeIn().parent('.form-group').addClass('hasError');
            } else if (!/^[a-zA-Z0-9_-]{4,18}$/.test($(this).val())) {
                $(this).siblings('span.error').text('昵称只能包含字母、数字、下划线和减号').fadeIn().parent('.form-group').addClass('hasError');
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            }
        }

        // Email
        if ($(this).hasClass('email')) {
            if ($(this).val().length == '') {
                $(this).siblings('span.error').text('请输入你的邮箱').fadeIn().parent('.form-group').addClass('hasError');
                //  正则判断邮箱格式是否规范
            } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val())) {
                $(this).siblings('span.error').text('邮箱格式不正确').fadeIn().parent('.form-group').addClass('hasError');
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            }
        }

        // Phone
        if ($(this).hasClass('verCode')) {
            // 正则判断验证码码格式是否规范
            if ($(this).val().length != '' && !/^[0-9]{6}$/.test($(this).val())) {
                $(this).siblings('span.error').text('验证码不符').fadeIn().parent('.form-group').addClass('hasError');
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            }
        }

        // PassWord
        if ($(this).hasClass('pass')) {
            // 正则判断密码是否符合规范
            if ($(this).val().length == '' || !/^[a-zA-Z0-9]\w{7,19}$/.test($(this).val())) {
                $(this).siblings('span.error').text('请输入8个字符及以上').fadeIn().parent('.form-group').addClass('hasError');
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            }
        }

        // PassWord confirmation
        if ($('.pass').val() !== $('.passConfirm').val()) {
            $('.passConfirm').siblings('.error').text('密码与你的输入不匹配').fadeIn().parent('.form-group').addClass('hasError');
        } else {
            $('.passConfirm').siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
        }

        // Email
        if ($(this).hasClass('loginValue')) {
            if ($(this).val().length == '') {
                $(this).siblings('span.error').text('请输入完整账户').fadeIn().parent('.form-group').addClass('hasError');
                //  正则判断邮箱格式是否规范
            } else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val())) {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            } else if (/^1[34578]\d{9}$/.test($(this).val())) {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            } else {
                if ($(this).val().length === 0) {
                    $(this).siblings('span.error').text('请输入你的账户').fadeIn().parent('.form-group').addClass('hasError');
                } else if ($(this).val().length > 1 && $(this).val().length <= 3) {
                    $(this).siblings('span.error').text('请输入4个字符及以上').fadeIn().parent('.form-group').addClass('hasError');
                } else if (!/^[a-zA-Z0-9_-]{4,18}$/.test($(this).val())) {
                    $(this).siblings('span.error').text('昵称只能包含字母、数字、下划线和减号').fadeIn().parent('.form-group').addClass('hasError');
                } else {
                    $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                }
            }
        }
        // PassWord
        if ($(this).hasClass('loginPassword')) {
            // 正则判断密码是否符合规范
            if ($(this).val().length == '' || (!/^[a-zA-Z0-9]\w{7,19}$/.test($(this).val()))) {
                $(this).siblings('span.error').text('请验证并输入正确格式').fadeIn().parent('.form-group').addClass('hasError');
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            }
        }

        // label effect
        if ($(this).val().length > 0) {
            $(this).siblings('label').addClass('active');
        } else {
            $(this).siblings('label').removeClass('active');
        }
    });

    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }
    });
});
import Geet from '../../components/geetest/Geet.vue';
//导入nanoId
import { nanoid } from 'nanoid';
export default {
    data: function () {
        return {
            labelTime: '聚焦获取验证码',
            //极验触发参数
            isgt: false,
            //验证码倒计时与获取验证码Axios触发参数
            isCode: false,
            // 极验验证作用标识
            codeGtType: '',

            form: {
                email: '',
                password: '',
                code: '',
                nanoId: '',
                account: '',
                password2: '',
            },
            login: {
                value: '',
                type: '',
                loginLabel: '邮件、手机、昵称',
                pwdValue: '密码',
                isCode: false,
                pwd: '',
            }
        }
    },
    components: {
        Geet
    },
    methods: {
        //如果#verCode的焦点被获取，则触发事件
        codeInputFocus() {
            if (this.form.email != '' && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.email)) {
                if (this.labelTime == '聚焦获取验证码' || this.labelTime == '聚焦再次获取') {
                    this.codeGtType = 'email';
                    this.isgt = true;
                } else {
                    this.$message({
                        showClose: true,
                        message: '你的验证码还有' + this.labelTime + '秒到期,请填写。',
                        type: 'success',
                        duration: 2000,
                        customClass: 'TimeMessage'
                    });
                }
            } else {
                this.$message({
                    showClose: true,
                    message: '请输入正确的邮箱',
                    type: 'error',
                    duration: 2000,
                    customClass: 'TimeMessage'
                });
            }
        },
        toHome() {
            this.$router.push('/');
        },
        pwdInputFocus() {
            if (this.login.pwdValue == '聚焦获取验证码' || this.login.pwdValue == '聚焦再次获取') {
                this.codeGtType = 'phone';
                this.isgt = true;
            } else if (!isNaN(this.login.pwdValue)) {
                this.$message({
                    showClose: true,
                    message: '你的验证码还有' + this.login.pwdValue + '秒到期,请填写。',
                    type: 'success',
                    duration: 2000,
                    customClass: 'TimeMessage'
                });
            } else if (this.login.pwdValue == '邮件' || this.login.pwdValue == '手机' || this.login.pwdValue == '昵称') {
                this.$message({
                    showClose: true,
                    message: '请输入完整账户',
                    type: 'error',
                    duration: 2000,
                    customClass: 'TimeMessage'
                });
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
                if (this.codeGtType == 'email') {
                    this.isCode = true;
                    console.log("email");
                } else if (this.codeGtType == 'phone') {
                    this.login.isCode = true;
                    console.log("phone");
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
        loginInfo() {
            //判断login中是否有空值
            if(this.login.value == '' || this.login.pwd == ''){
                this.$message({
                    showClose: true,
                    message: '请输入完整账户和密码',
                    type: 'error',
                    duration: 2000,
                    customClass: 'TimeMessage'
                });
                return;
            }else{
                    api.postFormAPI('/Login?act=' + this.login.type, this.login).then(res => {
                    if (res.data.code == 200) {
                        //将res.token存入localStorage
                        localStorage.setItem('token', res.data.token);
                        //将nanoid存入localStorage
                        localStorage.setItem('nanoId', res.data.nanoId);
                        //将uid存入localStorage
                        localStorage.setItem('uid', res.data.uid);
                        //将头像存入localStorage
                        localStorage.setItem('circleUrl', res.data.avatar);
                        //将uname存入localStorage
                        localStorage.setItem('name', res.data.uname);
                        //将phone存入localStorage
                        localStorage.setItem('phone', res.data.phone);
                        //跳转到主页
                        this.$router.push('/');
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration: 1000,
                        });
                    }
                });
            }

        },
        enrollInfo() {
            //判断form中是否有空值
            if (this.form.email == '' || this.form.password == '' || this.form.code == '' || this.form.account == '') {
                this.$message({
                    showClose: true,
                    message: '请填写完整信息',
                    type: 'error',
                    duration: 1000,
                });
                return;
            }else if (this.form.password != this.form.password2) {
                this.$message({
                    showClose: true,
                    message: '两次密码不一致',
                    type: 'error',
                    duration: 1000,
                });
                return;
            }else {
                // 生成nanoid
                this.form.nanoId = nanoid();
                api.postFormAPI('/Enroll', this.form).then(res => {
                    if (res.data.code == 200) {
                        //将res.token存入localStorage
                        localStorage.setItem('token', res.data.token);
                        //将nanoid存入localStorage
                        localStorage.setItem('nanoId', res.data.nanoId);
                        //将uid存入localStorage
                        localStorage.setItem('uid', res.data.uid);
                        //将头像存入localStorage
                        localStorage.setItem('circleUrl', res.data.avatar);
                        $('.signup, .login').addClass('switched');
                        setTimeout(function () { $('.signup, .login').hide(); }, 700);
                        setTimeout(function () { $('.brand').addClass('active'); }, 300);
                        setTimeout(function () { $('.heading').addClass('active'); }, 600);
                        setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
                        setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
                        setTimeout(function () { $('.form').hide(); }, 700);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration: 1000,
                        });
                    }
                });
            }
        }
    },
    watch: {
        isCode(val) {
            if (val == true) {
                api.postFormAPI('/emailSmtp', this.form).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: '验证码已发送，请查收',
                            type: 'success',
                            duration: 2000,
                        });
                        console.log(this)
                        //计数器
                        this.labelTime = 120;
                        //定时器，每秒-1
                        this.timer = window.setInterval(() => {
                            this.labelTime--;
                            if (this.labelTime <= 1 || isNaN(this.labelTime)) {
                                //清除定时器
                                clearInterval(this.timer);
                                this.labelTime = '聚焦再次获取';
                                this.isCode = false;
                                //使#StoreHouse失去焦点
                                $('#StoreHouse').blur();
                            }
                        }, 1000);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration: 2000,
                        });
                    }
                });
            }
        },
        'login.value'(val) {
            if (val == '' || val == null) {
                this.login.loginLabel = '邮件、手机、昵称';
            } else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)) {
                this.login.type = 'email';
                this.login.loginLabel = '邮件';
                this.login.pwdValue = '密码';
            } else if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val)) {
                this.login.type = 'phone';
                this.login.loginLabel = '手机';
                this.login.pwdValue = '聚焦获取验证码';
            } else {
                this.login.type = 'username';
                this.login.loginLabel = '昵称';
                this.login.pwdValue = '密码';
            }
        },
        'login.isCode'(val) {
            if (val == true) {
                api.postFormAPI('/phoneCode', this.login).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: '验证码已发送，请查收',
                            type: 'success',
                            duration: 2000,
                        });
                        //计数器
                        this.login.pwdValue = 120;
                        //定时器，每秒-1
                        this.timer = window.setInterval(() => {
                            this.login.pwdValue--;
                            if (this.login.pwdValue <= 1 || isNaN(this.login.pwdValue)) {
                                //清除定时器
                                clearInterval(this.timer);
                                this.login.pwdValue = '聚焦再次获取';
                                this.login.isCode = false;
                                //使#StoreHouse失去焦点
                                $('#loginPassword').blur();
                            }
                        }, 1000);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration: 2000,
                        });
                        console.log(res);
                    }
                });
            }
        },
    }
};
</script>

<style lang="sass" scoped>

// Fonts
$mainFont: 'Raleway', sans-serif
$subFont: 'Montserrat', sans-serif

// Color Scheme
$primaryColor: #f95959
$secondaryColor: #f7edd5
$inputColor: #bbbbbb

// General Style
body
   font-family: $subFont
   background: $secondaryColor

.container
   max-width: 900px

a
   display: inline-block
   text-decoration: none

input
   outline: none!important

h1
   text-align: center
   text-transform: uppercase
   margin-bottom: 40px
   font-weight: 700

section#formHolder
   padding: 50px 0



// Brand Area
.brand
   padding: 20px
   background-size: cover
   background-position: center center
   color: #fff
   min-height: 540px
   position: relative
   box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3)
   transition: all 0.6s cubic-bezier(1.000, -0.375, 0.285, 0.995)
   z-index: 9999

   &.active
      width: 100%

   &::before
      content: ''
      display: block
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0
      background: rgba(0, 0, 0, 0.85)
      z-index: -1
   a.logo
      color: $primaryColor
      font-size: 20px
      font-weight: 700
      text-decoration: none
      line-height: 1em
      span
         font-size: 30px
         color: #fff
         transform: translateX(-5px)
         display: inline-block

   .heading
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      text-align: center
      transition: all 0.6s
      &.active
         top: 100px
         left: 100px
         transform: translate(0)

      h2
         font-size: 70px
         font-weight: 700
         text-transform: uppercase
         margin-bottom: 0
      p
         font-size: 15px
         font-weight: 300
         text-transform: uppercase
         letter-spacing: 2px
         white-space: 4px
         font-family: $mainFont

   .success-msg
      width: 100%
      text-align: center
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      margin-top: 60px

      p
         font-size: 25px
         font-weight: 400
         font-family: $mainFont

      a
         font-size: 12px
         text-transform: uppercase
         padding: 8px 30px
         background: $primaryColor
         text-decoration: none
         color: #fff
         border-radius: 30px

      p, a
         transition: all 0.9s
         transform: translateY(20px)
         opacity: 0

         &.active
            transform: translateY(0)
            opacity: 1


// Form Area
.form
   position: relative

   .form-peice
      background: #fff
      min-height: 480px
      margin-top: 30px
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2)
      color: $inputColor
      padding: 30px 0 60px
      transition: all 0.9s cubic-bezier(1.000, -0.375, 0.285, 0.995)
      position: absolute
      top: 0
      left: -30%
      width: 130%
      overflow: hidden
      &.switched
         transform: translateX(-100%)
         width: 100%
         left: 0

   form
      padding: 0 40px
      margin: 0
      width: 70%
      position: absolute
      top: 50%
      left: 60%
      transform: translate(-50%, -50%)


      .form-group
         margin-bottom: 5px
         position: relative
         &.hasError
            input
               border-color: $primaryColor !important
            label
               color: $primaryColor !important

      label
         font-size: 12px
         font-weight: 400
         text-transform: uppercase
         font-family: $subFont
         transform: translateY(40px)
         transition: all 0.4s
         cursor: text
         z-index: -1
         &.active
            transform: translateY(10px)
            font-size: 10px
         &.fontSwitch
            font-family: $mainFont !important
            font-weight: 600

      input:not([type=submit])
         background: none
         outline: none
         border: none
         display: block
         padding: 10px 0
         width: 100%
         border-bottom: 1px solid #eee
         color: #444
         font-size: 15px
         font-family: $subFont
         z-index: 1
         &.hasError
            border-color: $primaryColor

      span.error
         color: $primaryColor
         font-family: $subFont
         font-size: 12px
         position: absolute
         bottom: -20px
         right: 0
         display: none

      input[type=password]
         color: $primaryColor

      .CTA
         margin-top: 30px
         input
            font-size: 12px
            text-transform: uppercase
            padding: 5px 30px
            background: $primaryColor
            color: #fff
            border-radius: 30px
            margin-right: 20px
            border: none
            font-family: $subFont

         a.switch
            font-size: 13px
            font-weight: 400
            font-family: $subFont
            color: $inputColor
            text-decoration: underline
            transition: all 0.3s
            &:hover
               color: $primaryColor


footer
   text-align: center
   p
      color: #777
      a, a:focus
         color: #b8b09f
         transition: all .3s
         text-decoration: none !important
         &:hover
            color: $primaryColor



@media (max-width: 768px)
   .container
      overflow: hidden
   section#formHolder
      padding: 0
      div.brand
         min-height: 200px !important
         &.active
            min-height: 100vh !important

         .heading.active
            top: 200px
            left: 50%
            transform: translate(-50%, -50%)

         .success-msg
            p
               font-size: 16px
            a
               padding: 5px 30px
               font-size: 10px


      .form
         width: 80vw
         min-height: 500px
         margin-left: 10vw
         .form-peice
            margin: 0
            top: 0
            left: 0
            width: 100% !important
            transition: all .5s ease-in-out

            &.switched
               transform: translateY(-100%)
               width: 100%
               left: 0
            > form
               width: 100% !important
               padding: 60px
               left: 50%

@media (max-width: 480px)
   section#formHolder .form
      width: 100vw
      margin-left: 0

   h2
      font-size: 50px !important
</style>