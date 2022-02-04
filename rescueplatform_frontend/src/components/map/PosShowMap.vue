<template>
  <div id="allmap" class="Map" />
</template>
 
<script>
/* eslint-disable*/

export default {
  name: "Mapbox",
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        var map = new BMap.Map("allmap"); //初始化map, 绑定id=allmap
        var normalpoint = new BMap.Point(121.48789949, 31.24916171); // 初始化point, 给定一个默认x,y值
        map.centerAndZoom(normalpoint, 16); // 将point点放入map中，展示在页面中心展示，10=缩放程度
        map.enableScrollWheelZoom(); // 开启滚动鼠标滑轮

        let point = new BMap.Point(posx, posy);
        let markers = new BMap.Marker(point);
        map.addOverlay(markers); // 将标注添加到地图中
      });
    },
  },
};
</script>
 
<style>
.Map {
  height: calc(100vh - 126px);
  width: 100%;
}
</style>