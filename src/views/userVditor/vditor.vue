<template>
    <div id="app_vditor">
        <!-- TODO:退出，重写，等操作板 -->
        <h2 class="editH2">撰写新文章</h2>
        <div class="leftBox">
            <el-input v-model="Essay.title" placeholder="请输入标题"></el-input>
            <div id="vditor">
                <userVditor class="vditor"></userVditor>
            </div>
        </div>
        <div class="rightBox">
            <el-date-picker class="date-picker" format="yyyy-MM-dd hh:mm:ss" value-format="yyyy-MM-dd hh:mm:ss" v-model="Essay.dateTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker>
            <template>
                <label for="board">选择板块</label>
                <el-select v-model="Essay.cate_value" placeholder="选择板块" class="temp">
                    <el-option v-for="item in cate_options" :key="item.categoryId" :label="item.categoryTitle"
                        :value="item.categoryId">
                    </el-option>
                </el-select>
            </template>

            <template>
                <label for="tag">选择标签</label>
                <el-select v-model="Essay.tag_value" placeholder="选择标签" class="temp">
                    <el-option v-for="item in tag_options" :key="item.tagId" :label="item.tagName" :value="item.tagId">
                    </el-option>
                </el-select>
            </template>
            <label for="btn">完成操作</label>
            <el-button class="btnEL" type="primary" icon="el-icon-s-promotion" @click="pushEssay">发布文章</el-button>
            <el-button class="btnEL btnEllast" type="primary" icon="el-icon-delete" @click="cleanEssay">清空文章</el-button>
        </div>
    </div>
</template>

<script>
import userVditor from '@/components/userVditor'
import api from '@/api/api'
export default {
    data() {
        return {
            //下拉框选项参数
            cate_options: [],
            //下拉框选项参数
            tag_options: [],
            Essay:{
                title: '',
                cate_value: '',
                tag_value: '',
                dateTime: '',
                content: '',
            }
        }
    },
    components: {
        userVditor
    },
    methods: {
        CategoryAndTag(){
            api.postFormAPI('/CategoryAndTag').then(res => {
                if (res.data.code == 200) {
                    this.cate_options = res.data.Category;
                    this.tag_options = res.data.Tag;
                }else{
                    this.$message.error(res.data.msg);
                }
            });
        },
        cleanEssay(){
            window.contentEditor.setValue('');
        },
        pushEssay(){
            this.Essay.content = window.contentEditor.getValue();
            //判断非空
            if (this.Essay.title == '') {
                this.$message.error('标题不能为空');
                return;
            }
            if (this.Essay.content == '') {
                this.$message.error('内容不能为空');
                return;
            }
            if (this.Essay.cate_value == '') {
                this.$message.error('请选择板块');
                return;
            }
            if (this.Essay.tag_value == '') {
                this.$message.error('请选择标签');
                return;
            }
            if (this.Essay.dateTime == '') {
                this.$message.error('请选择日期');
                return;
            }
            api.postFormAPI('/EssayPush', this.Essay).then(res => {
                if (res.data.code == 200) {
                    this.$message.success("发布成功");
                    //跳转首页
                    this.$router.push('/');
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        }
    },
    mounted() {
        this.CategoryAndTag();
    },

}
</script>

<style scoped>
.leftBox {
    width: 859px;
    float: left;
    margin-right: 10px;
}

.editH2 h2 {
    font-weight: bold;
    font-size: 1.28571em;
}

.rightBox {
    width: 250px;
    float: left;
}

#app_vditor {
    margin: 0 200px;
}

.leftBox .el-input {
    margin: 10px 0;
    width: 859px;
}

.rightBox .date-picker {
    margin: 10px 0;
    width: 250px;
}

.temp {
    margin-bottom: 10px;
    width: 250px;
}
.btnEL{
    width: 250px;
    margin-bottom: 10px;
}
.btnEllast{
    margin-left: 0;
}
</style>