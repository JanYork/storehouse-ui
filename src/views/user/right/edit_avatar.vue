<template>
    <div>
        <h1><i class="el-icon-picture-outline"></i>修改头像
            <hr>
        </h1>

        <div class="el_upload">
            <el-upload class="avatar-uploader" action="http://localhost:8081/api/StoreHouse/updateAvatar"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                :data="userInfo">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>

        <el-card class="box-card">
            请上传正常的人物头像，真人或卡通皆可。上传闪烁、奇异、违法、色情头像，情节严重者将会被禁言处理。
        </el-card>

        <el-button @click="uploadAvatar" class="btn_el" type="primary">确定<i class="el-icon-upload el-icon--right"></i>
        </el-button>
    </div>
</template>

<script>
import api from '@/api/api';
export default {
    data() {
        return {
            imageUrl: '',
            userInfo: {
                uid: localStorage.getItem('uid'),
                token: localStorage.getItem('token'),
                //文件名
                name: '',
            },
            isTure: false,
        };
    },
    methods: {
        handleAvatarSuccess(res) {
            this.imageUrl = res.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';

            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是png、jpg、gif格式!');
                return false;
            } else if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return false;
            }

            //判断尺寸
            const img = new Image();
            img.src = URL.createObjectURL(file);
            this.isTure = img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                if (width < 100 || height < 100) {
                    this.$message.error('提醒：上传头像图片尺寸不要小于100*100!');
                    return false;
                }
                if (width > 200 || height > 200) {
                    this.$message.error('提醒：上传头像图片尺寸不要大于200*200!');
                    return false;
                }
                if (width / height > 1.5 || width / height < 0.5) {
                    this.$message.error('提醒：上传头像图片长宽比例不要超过1.5:1或者小于0.5:1!');
                    return false;
                }
                return true;
            };

            let nanoId = localStorage.getItem('nanoId');
            //截取nanoId的后4位
            nanoId = nanoId.substring(nanoId.length - 4);
            //获取文件名
            this.userInfo.name = nanoId + file.name;
            return isJPG && isLt2M;
        },
        uploadAvatar() {
            localStorage.setItem('circleUrl', this.imageUrl);
            api.postFormAPI('/ServletUserInfo?act=getUserInfoByAccount', {
                imageUrl: this.imageUrl
            }).then(res => {
                this.$message.success(res.data.msg);
                //刷新页面
                window.location.reload();
            }).catch(err => {
                this.$message.error('上传失败!');
            });
        },
    },
    mounted() {
        if (localStorage.getItem('circleUrl')) {
            this.imageUrl = localStorage.getItem('circleUrl');
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

h1 i {
    margin-right: 8px;
}

/* 头像上传 */
.el_upload {
    width: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    margin-bottom: 15px;
    float: left;
}

.avatar {
    width: 175px;
    height: 175px;
}

.el_upload:hover {
    border-color: #409EFF;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader >>> .el-upload{
    display: flex;
    align-items: center;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 150px;
    height: 150px;
    display: block;
    opacity: 0.3;
}

/* 按钮 */
.btn_el {
    width: 178px;
    float: left;
    margin: 10px 50px;
}

/* Card卡片 */
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    float: left;
    margin: 20px 50px;
    width: 480px;
    padding: 10px 20px;
}

.avatar-uploader{
    height: 176px;
    display: flex;
    justify-content: center;
}
</style>