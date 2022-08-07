<template>
    <div id="vditor">
    </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default {
    data() {
        return {
            contentEditor: ''
        }
    },
    mounted() {
        window.contentEditor = this.contentEditor = new Vditor('vditor', {
            height: '900px',
            width: '859px',
            toolbarConfig: {
                pin: true,
            },
            cache: {
                enable: false,
            },
            after: () => {
                this.contentEditor.setValue('')
            },
            upload: {
                accept: 'image/*',
                // token: this.token,
                url: 'http://localhost:8081/api/StoreHouse/UpdateImg',
                //TODO：链接上传未配置
                // linkToImgUrl: 'http://localhost:8081/api/StoreHouse/UpdateImg',
                filename(byte) {
                    return byte.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
                        replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
                        replace('/\\s/g', '')
                },
                multiple: false,
                success(_,msg){
                    msg = JSON.parse(msg);
                    console.log(msg);
                    if(msg.code == 0){
                        window.contentEditor.insertValue(`![${msg.name}](${msg.url})`)
                    }            
                }
            },
        });
    }
}
</script>

<style scoped>
#vditor {
    margin: 0 auto;
    width: 100%;
    height: 360px;
}
</style>