<template>
    <div>
        <el-card>
            <el-collapse accordion>
                <el-collapse-item title="发布规则" name="1">
                    <div>发布相关文章内容需不违反法律规定；</div>
                    <div>不得发送非生活或技术交流内容，禁止广告引流；</div>
                    <div>禁止任何黄色暴力以及负面情绪内容，和谐交流。</div>
                </el-collapse-item>
                <el-collapse-item title="问题反馈" name="2">
                    <div>Bug反馈：如果出现Bug，请向邮箱747945307@qq.com反馈说明，谢谢；</div>
                    <div>灌水反馈：如果发现灌水行为请举报，谢谢。</div>
                </el-collapse-item>
                <el-collapse-item title="交流范围" name="3">
                    <div>允许正常范围内生活方面交流；</div>
                    <div>主要范围为计算机技术交流，包含前后端运维与设计等等。</div>
                </el-collapse-item>
                <el-collapse-item title="其他问题" name="4">
                    <div>其他问题联系邮箱，谢谢。</div>
                </el-collapse-item>
            </el-collapse>
        </el-card>

        <el-card class="buttom_card">
            <ul class="card-ul">
                <li>
                    <img @click="toElm" src="https://a.ideaopen.cn/JanYork/xuUyO74o.png" alt="Element UI框架">
                </li>
                <li>
                    <img @click="toLearnKu" src="https://a.ideaopen.cn/JanYork/13Y9XtMZ.png" alt="LearnKu技术社区">
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script>
export default {
    methods: {
        toElm() {
            window.open('https://element.eleme.cn/#/zh-CN');
        },
        toLearnKu() {
            window.open('https://learnku.com/');
        },

    }
}
</script>

<style scoped>
.buttom_card{
    margin-top: 20px;
}

.buttom_card li{
    display: flex;
    justify-content: center;
    list-style: none;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    cursor: pointer;
}
.card-ul{
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 10px 0;
}
</style>