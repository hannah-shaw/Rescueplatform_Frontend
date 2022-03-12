<template>
  <div>
    <div class="block">
    <span class="demonstration">浏览量</span>
    <el-slider v-model="views"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">人数</span>
    <el-slider v-model="people"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">受灾人群含有老人</span>
    <el-slider v-model="old"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">受灾人群含有小孩</span>
    <el-slider v-model="child"></el-slider>
  </div>
  </div>
</template>

<script>
export default {
  name: "SysLog",
  data() {
      return {
        views: 25,
        people: 25,
        old: 25,
        child: 25,
      }
    },
    methods: {
      formatTooltip(val) {
        return val / 100;
      }
    }
};
</script>

<style>
</style>