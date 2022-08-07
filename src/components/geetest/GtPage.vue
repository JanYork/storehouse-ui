<template>
  <div>
    <el-button @click="btnClick()" type="primary">点击验证</el-button>
    <!-- isgt是一个布尔值，当前页面点击按钮，修改它，子组件监听数据变化，加载滑动模块 -->
    <Geet :isGeet="isgt" @geetPath="GeetPath" @clickChange="GeetChange"></Geet>
  </div>
</template>
<script>
import Geet from "./Geet.vue";
export default {
  data() {
    return {
      isgt: false
    };
  },
  components: {
    Geet
  },

  methods: {
    btnClick() {
      console.log("2,按钮被点击，进行图形验证");
      this.isgt = !this.isgt;
    },
    // 极验图片加载之后，通过更改控制变量实现可以再次加载
    GeetChange(val) {
      this.isgt = val;
    },
    GeetPath(val) {
      console.log("4,接受到图形验证参数，将参数发往服务端进行验证");
      console.log(val);
      this.isgt = false;
    }
  },

  computed: {},

  created() {},

  mounted() {}
};
</script>
