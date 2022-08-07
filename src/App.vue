<template>
  <div id="app">
    <router-view/>
    <bottomBox class="bottom_box"></bottomBox>
  </div>
</template>

<script>

import bottomBox from "@/components/bottom/index.vue";

export default {
  name: 'App',
  components: {
    bottomBox
  },
}
</script>

<style>
    /*全局背景色*/
    body {
        background-color:#F0F2F5;
    }
    #app{
      display: flex;
      flex-direction: column;
    }
</style>