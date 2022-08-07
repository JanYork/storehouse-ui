<template>
    <div class="bottom">
        <div class="logo_bottom">
            <img src="https://a.ideaopen.cn/JanYork/3b7QonAG.png">
        </div>

        <p class="bottom_p">
            <a href="http://beian.miit.gov.cn/" target="_blank">湘ICP备XXXXXXXX号-X</a>
            <span class="mx-2">|</span>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502004330" target="_blank"><img
                    src="https://cdn.learnku.com/uploads/images/201908/21/1/L4ckM2CVb6.png!/fw/20" width="20"
                    style="position: relative;top: 4px;"> 湘公网安备 xxxxxxxxxxxxxx号</a>
            <span class="mx-2">|</span>
            <a href="mailto:747945307@qq.com">违法和不良信息举报</a>
        </p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bottom {
    display: flex;
    justify-content: center;
    background-color: #1B1C1D;
    width: 100%;
    margin-top: 60px;
    flex-wrap: wrap;
}

.logo_bottom img {
    width: 300px;
}

.logo_bottom {
    margin: 50px 0;
    width: 100%;
    display: flex;
    justify-content: center;
}

.bottom_p {
    color: #9a9da1;
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bottom_p span {
    margin: 0 10px;
}

.bottom_p a {
    color: #9a9da1;
    font-size: 14px;
}

.bottom_p a>img {
    position: relative;
    top: 0px !important;
}
</style>