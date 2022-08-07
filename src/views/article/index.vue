<template>
    <div>
        <banner></banner>
        <tool class="tool"  v-show="rightShow"></tool>
        <div class="artCenter">
            <div class="leftBox">
                <el-card class="articleBox">
                    <h1 class="title">
                        <div class="pull-left">
                            <span style="line-height: 34px;">{{ topic.title }}</span>
                        </div>
                        <div class="clearfix"></div>
                    </h1>
                    <div class="hr"></div>
                    <!-- 文章主体 -->
                    <div class="article" id="article"></div>
                </el-card>
            </div>
            <div class="rightBox">
                <el-card class="authorBox">
                    <div class="authorTopBox">
                        <div class="avatarlineBox">
                            <el-avatar class="avatarBox" shape="square" :size="50" :src="userInfo.avatarAddress">
                            </el-avatar>
                        </div>
                    </div>

                    <div class="centerIco">
                        <i class="uName">{{ userInfo.account }}</i>
                        <i class="fa fa-home">主页</i>
                        <span class="span_fa"><i id="fa_heart" class="fa fa-heartbeat"></i><i class="fa-i">正常</i></span>
                    </div>
                    <a @click="toUrl" class="introduce" :src="userInfo.url">{{userInfo.urlFlag}}</a>
                </el-card>

                <rightBox class="right_buttom"></rightBox>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/api'
import banner from '@/components/banner/banner.vue'
import Vditor from "vditor"
import "vditor/dist/index.css"
import rightBox from '@/components/rightOther/index.vue'
import tool from '@/components/leftTool/index.vue'

export default {
    data() {
        return {
            rightShow: this.$store.state.isLogin,
            article: {
                topicId: '',
            },
            topic: [],
            userInfo: {
                url: '',
                urlFlag: '',
            },
        }
    },
    components: {
        banner,
        rightBox,
        tool,
    },
    methods: {
        getArticle() {
            //获取链接后携带的参数
            this.article.topicId = this.$route.params.id;
            api.postFormAPI("/TopicToId", this.article).then(res => {
                this.topic = res.data;
                Vditor.preview(document.getElementById('article'), this.topic.topicContent, {
                    lazyLoadImage: "https://a.ideaopen.cn/JanYork/IOwLSiDs.gif",
                });
                this.getUserInfo();
            });
        },
        toUrl() {
            if (this.userInfo.url == '' || this.userInfo.url == null) {
                this.$message({
                    message: '该用户没有个人网站',
                    type: 'warning',
                });
            } else {
                window.open(this.userInfo.url);
            }
        },
        getUserInfo() {
            api.postFormAPI("/ServletUserInfo?act=getUserInfoByUid", {
                topicUid: this.topic.topicUid,
            }).then(res => {
                this.userInfo = res.data;
                console.log(this.userInfo);
                if (res.data.url) {
                    this.userInfo.url = res.data.url;
                    this.userInfo.urlFlag = "个人网站";
                } else {
                    this.userInfo.url = "";
                    this.userInfo.urlFlag = "暂无站点";
                }
            });
        }
    },
    mounted() {
        window.scrollTo(0, 0);
        this.getArticle();
    },
}
</script>

<style scoped>
.artCenter {
    margin: auto 190px;
    margin-top: 35px;
}

.leftBox {
    width: 880px;
    float: left;
}

.leftBox .articleBox .title {
    color: #636b6f;
    min-height: 1rem;
}

.leftBox .articleBox .title .pull-left {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
    min-width: 320px;
    width: 100%;
}

.leftBox .articleBox .hr {
    border-bottom: 1px solid #f2f2f2;
}

.leftBox .articleBox .article {
    color: #636b6f;
}

.rightBox {
    width: 230px;
    float: left;
    margin-left: 20px;
}

.authorBox {
    display: flex;
    align-items: center;
}

.authorBox >>> .el-card__body{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center
}

.avatarBox {
    border-radius: 0;
}

.avatarlineBox {
    display: flex;
    align-items: center;
    border: 1px solid #f2f2f2;
    padding: 3px;
    cursor: pointer;
}


.centerIco .uName,.fa-i{
    font-style: normal;
}

.fa-i{
    font-size: 12px !important;
}

.centerIco {
    display: flex;
    align-items: baseline;
    margin-top: 10px;
    height: 50px;
    cursor: pointer;
    color: #949292;
    align-items: center
}

.centerIco .uName:hover {
    transition: all .5s ease-in-out;
    text-decoration: underline;
}

.centerIco .uName {
    font-size: 14px;
    font-weight: bold;
}

.centerIco i {
    margin-right: 10px;
    font-size: 13px;
    color: rgba(0, 0, 0, .4);
}

.centerIco .fa:hover {
    transition: all 0.6s ease-in-out;
    color: black;
    font-weight: 500;
}

.authorTopBox{
    display: flex;
    align-items: center;
}

#fa_heart{
    animation: fa_heart 1.3s infinite;
    margin-right: 5px;
}
@keyframes fa_heart {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

.introduce{
    text-decoration: none;
    color: #949292;
    cursor: pointer;
    transition: all .5s ease-in-out;
}

.introduce:hover{
    transition: all .5s ease-in-out;
    color: #626060;
}

.right_buttom{
    margin-top: 20px;
}

.tool{
    position: fixed;
    top: 100px;
    left: 80px;
}
</style>