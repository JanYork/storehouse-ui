<template>
    <div>
        <div class="leftBox">
            <el-card class="box-card" body-style="padding-bottom:10px">
                <el-tag @click="toTopicList(item.categoryId, item.categoryTitle)" :id="item.id" v-for="item in categoryList"
                    :key="item.categoryId" color="#F2F2F2" class="elTag" @mouseover.native="on" @mouseleave.native="out">
                    <img :src="item.categoryLogo">
                    <span>{{ item.categoryTitle }}</span>
                </el-tag>
            </el-card>

            <el-card class="essayList">
                <p class="hitokoto">{{ hitokotoMsg.hitokoto}}</p>
                <div class="elColl">
                    <el-button class="elCollItem" icon="el-icon-collection-tag" type="text" @click="getPageData">最新文章</el-button>
                    <el-button class="elCollItem" icon="el-icon-collection-tag" type="text" @click="getPageDataForBrowse">热门文章</el-button>
                    <el-button class="elCollItem" icon="el-icon-collection-tag" type="text" @click="getPageDataForThumbs">点赞最多</el-button>
                </div>
                <div>
                    <div class="essayBox" :id="item.topicCategoryId" v-for="item in essay" :key="item.topicId">
                        <a href="javascript:void(0);" @click="toArticle(item.topicId)">
                            <img :src="item.picPath" alt="">
                        </a>
                        <div class="essayTag">
                            <span>{{ item.tagName }}</span>
                        </div>
                        <a class="essayA" href="javascript:void(0);" @click="toArticle(item.topicId)">
                            <img :src="item.logo" alt="">
                            <div class="essayTitle">
                                <p>{{ item.title }}</p>
                            </div>
                            <div class="lastFlex">
                                <span class="satrt">
                                    <i class="el-icon-star-off"></i>{{ item.thumbsUp }}
                                </span>
                                <i class="split">|</i>
                                <span class="essayTime">
                                    <i class="el-icon-time"></i>{{ item.topicTime }}
                                </span>
                            </div>
                        </a>
                    </div>

                    <el-pagination class="el-pagination" background :page-size="page.pageSize" layout="prev, pager, next"
                        @current-change="handleCurrentChange" :total="total" :current-page="page.currentPage"
                        hide-on-single-page>
                    </el-pagination>
                </div>
            </el-card>
        </div>
        <div class="rightBox">
            <el-card class="userBox" v-show="isLogin">
                <div class="center">
                    <div class="avatarlineBox" @click="toUser">
                        <el-avatar class="avatarBox" shape="square" :size="50" :src="circleUrl"></el-avatar>
                    </div>
                    <div class="centerIco">
                        <i class="uName">{{name}}</i>
                        <i @click="signOut" class="fa fa-sign-out">退出</i>
                        <i @click="toEdit" class="fa fa-edit">编写</i>
                    </div>
                </div>
                <div class="jinrishici-sentence">{{poetryMsg}}</div>
            </el-card>
            <rightBox class="otherBox"></rightBox>
        </div>
    </div>
</template>

<script>
//导入jquery
import $ from 'jquery'
import api from '@/api/api'
import store from '@/store'
import axios from 'axios'
import rightBox from '@/components/rightOther/index.vue'
//诗词Api
const jinrishici = require('jinrishici');
//导入momentjs
import moment from 'moment'
export default {
    data() {
        return {
            //随机古诗词
            poetryMsg: '',
            //一言
            hitokotoMsg: '',
            isLogin: this.$store.state.isLogin,
            circleUrl: localStorage.getItem('circleUrl'),
            categoryList: [],
            //总条目数
            total: 0,
            page: {
                pageSize: 20,
                currentPage: 1,
            },
            essay: [],
            name: localStorage.getItem('name'),
        }
    },
    components: {
        rightBox
    },
    methods: {
        on(e) {
            var elTag = e.target;
            $(elTag).css("background-color", "#E0E0E0");
            $(elTag).children("span").css("color", "#000");
        },
        out(e) {
            var elTag = e.target;
            //颜色还原
            $(elTag).css("background-color", "#F2F2F2");
            $(elTag).children("span").css("color", "#616161");
        },
        getCategoryList() {
            api.postFormAPI("/getCategoryList").then(res => {
                this.categoryList = res.data;
            })
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            this.getPageData();
        },
        getPageData() {
            this.essay = [];
            api.postFormAPI("/TopicPages", this.page).then(res => {
                this.essay = this.getTimeDiff(res).data;
            });
        },
        getPageDataForBrowse() {
            this.essay = [];
            api.postFormAPI("/TopicBrowsePages", this.page).then(res => {
                this.essay = this.getTimeDiff(res).data;
            });
        },
        getPageDataForThumbs() {
            this.essay = [];
            api.postFormAPI("/TopicThumbsUpPages", this.page).then(res => {
                this.essay = this.getTimeDiff(res).data;
            });
        },
        TopicCount() {
            api.postFormAPI("/TopicCount").then(res => {
                this.total = res.data.count;
            })
        },
        toArticle(topicId) {
            console.log(topicId);
            // 跳转到路由
            this.$router.push({
                path: '/article/' + topicId
            })
        },
        toTopicList(id, title) {
            store.state.classify = title;
            this.$router.push({
                path: '/CategoryTopic/' + id
            })
        },
        getTime() {
            //获取时间戳
            var time = nowTime.getTime();
            return nowTime;
        },
        //格式化date时间
        formatDate(date) {
            var time = new Date(date.getTime() + 8 * 60 * 60 * 1000);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var day = time.getDate() - 1;
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        },
        //计算时差方法
        getTimeDiff(res) {
            //获取当前时间
            const nowTime = moment(moment().format("YYYY-MM-DD HH:mm:ss"));
            //循环改变res.data的参数
            for (var i = 0; i < res.data.length; i++) {
                //判断非空
                if (res.data[i].topicTime == 0 || res.data[i].topicTime == '') {
                    res.data[i].topicTime = "时差异常";
                } else {
                    //获取开始时间
                    const satrtTime = moment(this.formatDate(new Date(res.data[i].topicTime)));
                    //获取时间差
                    const timeDiffer = nowTime.diff(satrtTime, 'minute');
                    //根据timeDiffer(分钟)计算时间
                    if (timeDiffer >= 365 * 24 * 60) {
                        res.data[i].topicTime = this.removeDecimal(timeDiffer / 365 / 24 / 60) + "年前";
                    } else if (timeDiffer >= 30 * 24 * 60) {
                        res.data[i].topicTime = this.removeDecimal(timeDiffer / 30 / 24 / 60) + "月前";
                    } else if (timeDiffer >= 24 * 60) {
                        res.data[i].topicTime = this.removeDecimal(timeDiffer / 24 / 60) + "天前";
                    } else if (timeDiffer >= 60) {
                        res.data[i].topicTime = this.removeDecimal(timeDiffer / 60) + "小时前";
                    } else if (timeDiffer >= 1) {
                        res.data[i].topicTime = this.removeDecimal(timeDiffer) + "分钟前";
                    } else {
                        res.data[i].topicTime = "刚刚";
                    }
                }
            }
            return res;
        },
        removeDecimal(num) {
            //去除小数点后面内容
            return num.toString().split(".")[0];
        },
        signOut() {
            localStorage.clear();
            window.location.reload();
        },
        toEdit() {
            this.$router.push({
                path: '/edit'
            })
        },
        load() {
            jinrishici.load(result => {
                this.poetryMsg = result.data.content;
            }, err => {
                this.$message({
                    message: '随机诗词加载失败',
                    type: 'error'
                });
            })
        },
        hitokoto(){
            axios.get('https://v1.hitokoto.cn/').then(res => {
                this.hitokotoMsg = res.data;
            }).catch(err => {
                this.$message({
                    message: '一言加载失败',
                    type: 'error'
                });
            })
        },
        toUser() {
            this.$router.push({
                path: '/user'
            })
        }
    },
    mounted() {
        this.getCategoryList();
        this.getPageData();
        this.TopicCount();
        this.load();
        this.hitokoto();
    },
}
</script>

<style scoped>

.box-card {
    width: 820px;
}

.box-card .elTag {
    padding: 0;
    margin: 0 10px 10px 0;
}

.box-card .elTag img {
    width: 26px;
    height: 26px;
    display: inline-block;
    background-color: transparent !important;
}

.box-card .elTag span {
    margin: 0 30px 0 10px;
    color: #616161;
    font-weight: bold;
    background-color: transparent !important;
}

.essayList {
    margin-top: 30px;
    width: 820px;
}

.essayBox {
    width: 780px;
    height: 60px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
}
.essayBox:first-child {
    border-top: 1px solid #f2f2f2;
}

.essayBox img {
    width: 35px;
    height: 35px;
}

.essayBox .essayTag {
    min-width: 80px;
}

.essayBox .essayTag span {
    background-color: #E8E8E8;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 400;
    margin-left: 10px;
    padding: 1px 13px;
    color: rgba(0, 0, 0, .6);
}

.essayBox .essayA {
    margin-left: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
}

.essayBox .essayA img {
    width: 15px;
    height: 15px;
    float: left;
    border-radius: 3px
}

.essayTitle {
    margin-left: 10px;
    display: flex;
    align-items: center;
}

.essayTitle p {
    font-size: 15px;
    font-weight: bold;
    color: #636b6f;
    margin-bottom: 0 !important;
}

.satrt i,
.essayTime i {
    margin-right: 5px;
}

.split {
    margin: 0 10px;
}

.lastFlex {
    margin-left: auto;
}

.el-pagination {
    margin: 20px 0;
}

.leftBox{
    float: left;
}
.rightBox{
    float: left;
    margin-left: 20px;
    width: 279px;
}

.userBox .center{
    display: inline-flex;
    align-items: center;
}

.centerIco .uName{
    font-style: normal;
}
.centerIco{
    display: flex;
    align-items: baseline;
    margin-left: 10px;
    margin-top: 10px;
    height: 50px;
    cursor: pointer;
    color: #949292;
}
.centerIco .uName:hover{
    transition: all .5s ease-in-out;
    text-decoration: underline;
}

.centerIco .uName{
    font-size: 14px;
    font-weight: bold;
}

.centerIco i{
    margin-right: 10px;
    font-size: 13px;
    color: rgba(0,0,0,.4);
}

.centerIco .fa:hover{
    transition: all 0.6s ease-in-out;
    color: black;
    font-weight: 500;
}

.jinrishici-sentence{
    font-size: 14px;
    color: #949292;
    margin-top: 10px;
    cursor: default;
}
.avatarBox {
    border-radius: 0;
}
.avatarlineBox{
    display: flex;
    align-items: center;
    border: 1px solid #f2f2f2;
    padding: 3px;
    cursor: pointer;
}

.hitokoto{
    font-size: 14px;
    color: #949292;
    margin-top: 10px;
    cursor: default;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
}

.elColl .elCollItem{
    transition: all 1s ease-in-out;
    margin-bottom: 10px;
    cursor: pointer;
    color: #949292;
    font-weight: 500;
}
.elColl .elCollItem:hover{
    transition: all 0.6s ease-in-out;
    color: rgb(53, 235, 232);
    font-weight: 500;
}

.userBox{
    margin-bottom: 20px;
}
</style>