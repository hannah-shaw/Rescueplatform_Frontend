<template>
  <div id="allmap" class="Map" />
</template>
 
<script>
/* eslint-disable*/

export default {
  name: "Mapbox",
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getRequest("/front/seekhelp-post/list").then((resp) => {
        this.data = resp;
        var length = this.data.length;
        var _this = this;
        //地图初始化
        var map = new BMap.Map("allmap"); //初始化map, 绑定id=allmap
        var point = new BMap.Point(121.48789949, 31.24916171); // 初始化point, 给定一个默认x,y值
        map.centerAndZoom(point, 13); // 将point点放入map中，展示在页面中心展示，10=缩放程度
        map.enableScrollWheelZoom(); // 开启滚动鼠标滑轮

        // 获取当前地理位置，标点
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
          } else {
            alert('failed' + this.getStatus());
          }
        });
        //标点
        for (var i = 0; i < this.data.length; i++) {
          let pointNumber = new BMap.Point(
            this.data[i].posx,
            this.data[i].posy
          );
          // 将data中的name加入地图中
          var label = new BMap.Label(this.data[i].name, {
            offset: new BMap.Size(5, 5),
          });

          let markers = new BMap.Marker(pointNumber);
          map.addOverlay(markers); // 将标注添加到地图中
          markers.setLabel(label); // 将data中的name添加到地图中
          // 标注的点击事件
          markers.addEventListener("click", function (e) {
            var lng = e.target.point.lng;
            var lat = e.target.point.lat;
            for (var i = 0; i < _this.data.length; i++) {
              if (lng == _this.data[i].posx && lat == _this.data[i].posy) {
                _this.$router.push({
                  path: "/seekdetail",
                  query: { id: _this.data[i].id },
                });
              }
            }
          });
        }
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