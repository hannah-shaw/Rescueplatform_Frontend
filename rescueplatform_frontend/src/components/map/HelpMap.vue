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
        var point = new BMap.Point(121.48789949, 31.24916171); // 初始化point, 给定一个默认x,y值
        map.centerAndZoom(point, 16); // 将point点放入map中，展示在页面中心展示，10=缩放程度
        map.enableScrollWheelZoom(); // 开启滚动鼠标滑轮

        var pdata = [];
        for (var i = 0; i < 1; i++) {
          pdata.push({
            id: "",
            name: "",
            phone: "",
            x: "",
            y: "",
            description: "",
          });
          pdata[i].id = 0;
          pdata[i].name = "肖寒";
          pdata[i].x = 120.2225897156944;
          pdata[i].y = 27.350190452014882;
          pdata[i].phone = 13107675919;
          pdata[i].description =
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试";

          let pointNumber = new BMap.Point(pdata[i].x, pdata[i].y);
          // 将data中的name加入地图中
          var label = new BMap.Label(pdata[i].name, {
            offset: new BMap.Size(5, 5),
          });
          markerFun(pointNumber, label);
        }

        function markerFun(points, label) {
          let markers = new BMap.Marker(points);
          map.addOverlay(markers); // 将标注添加到地图中
          markers.setLabel(label); // 将data中的name添加到地图中
          // 标注的点击事件
          markers.addEventListener("click", function (event) {
            //跳转详情


          });
        }

        // 获取当前地理位置
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            //alert('您当前位置：' + r.point.lng + ',' + r.point.lat);
          } else {
            //alert('failed' + this.getStatus());
          }
        });
      });
    },
  },
};
</script>
 
<style scoped>
.Map {
  height: calc(100vh - 126px);
  width: 100%;
}
</style>