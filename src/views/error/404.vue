<template>
  <div>
    <banner></banner>
    <div id="box">
      <div id="imgbox">
        <img src="https://a.ideaopen.cn/JanYork/ATqi9g5q.png">
        <h2>发生错误： 404 (Not Found)</h2>
      </div>
      <hr>
      <div id="lxbox">
        <h2>访问页面未找到！</h2>
        <br>
        <p>如果您觉得这是一个 Bug，请加站长邮箱进行反馈。添加后请道明来意，谢谢。</p>
        <br>
        <img src="https://a.ideaopen.cn/JanYork/rQc11pTx.png">
      </div>
      <br>
      <div id="divbox">
        <el-button @click="btnBack" icon="el-icon-back">返回</el-button>
        <el-button @click="btnHome" icon="el-icon-s-home">首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '@/components/banner/banner.vue'
  export default {
    components: {
      banner
    },
    methods: {
      btnBack() {
        this.$router.go(-1)
      },
      btnHome() {
        this.$router.push('/')
      }
    }
  }
</script>

<style>
  #box {
    width: 850px;
    height: 500px;
    background-color: rgb(255, 255, 255);
    /** 横纵居中 */
    margin: 0 auto;
    margin-top: 100px;
    padding: 30px;
  }
  #box #imgbox img {
    width: 50px;
    height: 50px;
  }
  #box h2 {
    font-size: 1.2em;
    color: #636B6F;
    font-weight: 700;
    line-height: 1.2857em;
    display: inline-block;
  }
  #box #imgbox h2{
    margin-left: 30px;
  }
  #box #lxbox img{
    width: 175px;
    border: 2px solid #ccc;
    border-radius: 5px;
  }
</style>