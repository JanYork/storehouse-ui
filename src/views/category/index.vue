<template>
    <div>
        <banner></banner>
        <div id="app_cate">
            <div class="leftBox">
                <el-card class="essayList">
                 <i class="fa fa-arrow-left" @click="toBack">返回</i>
                 <el-divider></el-divider>
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

                        <el-pagination class="el-pagination" background :page-size="page.pageSize"
                            layout="prev, pager, next" @current-change="handleCurrentChange" :total="total"
                            :current-page="page.currentPage" hide-on-single-page>
                        </el-pagination>

                    </div>
                </el-card>
            </div>
            <div class="rightBox">
                <el-card>
                    <div class="category_logoBox">
                        <img :src="categoryInfo.categoryLogo" class="category_logo">
                        <span class="category_title">{{ categoryInfo.categoryTitle}}技术板块</span>
                    </div>

                    <div class="category_description">
                        <p>{{ categoryInfo.description }}</p>
                    </div>
                    <div class="btn-el">
                        <el-button icon="el-icon-edit" @click="toEdit">发布文章</el-button>
                        <el-button icon="el-icon-message" @click="toEmail">社区投诉</el-button>
                    </div>
                </el-card>

                <rightBox class="right_buttom"></rightBox>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/api';
import banner from '@/components/banner/banner.vue'
import rightBox from '@/components/rightOther/index.vue'

//导入momentjs
import moment from 'moment'
export default {
    data() {
        return {
            total: 0,
            page: {
                pageSize: 20,
                currentPage: 1,
            },
            essay: [],
            categoryInfo: '',
            category_id: '',
        }
    },
    components: {
        banner,
        rightBox,
    },
    methods: {
        getArticle() {
            api.postFormAPI("/TopicPages?categoryId=" + this.category_id, this.page).then(res => {
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
                this.essay = res.data;
            });
        },
        toBack() {
            //如果没有返回上一页，则跳转到首页，如果有则返回上一页
            if (this.$route.meta.from == 'index') {
                this.$router.push({
                    path: '/'
                });
            } else {
                this.$router.go(-1);
            }
        },
        toArticle(topicId) {
            console.log(topicId);
            // 跳转到路由
            this.$router.push({
                path: '/article/' + topicId
            })
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            this.getPageData();
        },
        TopicCount() {
            api.postFormAPI("/TopicCount?categoryId=" + this.category_id, this.page).then(res => {
                this.total = res.data.count;
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
        removeDecimal(num) {
            //去除小数点后面内容
            return num.toString().split(".")[0];
        },
        getCategory(){
            api.postFormAPI("/getCategoryForId?categoryId=" + this.category_id, this.page).then(res => {
                this.categoryInfo = res.data[0];
            })
        },
        toEdit() {
            if (this.$store.state.isLogin) {
                this.$router.push({
                    path: '/edit/'
                });
            } else {
                this.$message.error('请先登录');
            }

        },
        toEmail() {
            location.href = "mailto:747945307@qq.com";
        }
    },
    mounted() {
        this.category_id = this.$route.params.id;
        this.getArticle();
        this.TopicCount();
        this.getCategory();
    },
    watch: {
        $route: function (to) {
            this.category_id = to.params.id;
            this.getArticle();
            this.TopicCount();
            this.getCategory();
        }
    }
}
</script>

<style scoped>
#app_cate {
    margin: auto 200px;
    margin-top: 35px;
}

.essayList {
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
    text-decoration: none;
    outline: none;
}

.essayBox .essayA p {
    text-decoration: none;
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

.fa-arrow-left{
    font-size: 13px;
    color: rgba(0,0,0,.4);
}

.fa-arrow-left:hover{
    transition: all 0.8s ease-in-out;
    color: black;
    font-weight: 500;
    cursor: pointer;
}

.rightBox{
    float: left;
    margin-left: 10px;
    width: 289px;
}
.category_logoBox{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f2;
}
.category_logo{
    width: 22px;
    height: 22px;
}
.category_title{
    font-size: 13px;
    font-weight: bold;
    color: #636b6f;
    margin-left: 5px;
}

.category_description{
    display: flex;
    align-items: center;
    font-size: 11px;
    color: #636b6f;
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
    font-weight: 400;
    margin: 10px 0;
}

.btn-el{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0 10px 0;
}

.right_buttom{
    margin-top: 20px;
}

</style>