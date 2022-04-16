<template>
  <div id="all">
    <el-input
      type="text"
      id="suggestId"
      name="address_detail"
      placeholder="地址"
      v-model="address_detail"
      class="input_style"
    />
    <div id="allmap"></div>
  </div>
</template>
<script>
export default {
  name: "sMapox",
  data() {
    return {
      address_detail: null, //详细地址
      address: "",
      province: "",
      city: "",
      userlocation: { lng: "", lat: "" },
    };
  },
  mounted() {
    this.$nextTick(function () {
      var th = this;
      // 创建Map实例
      var map = new BMap.Map("allmap");
      // 初始化地图,设置中心点坐标，
      var point = new BMap.Point(121.48789949, 31.24916171); // 初始化point, 给定一个默认x,y值
      map.centerAndZoom(point, 15);
      //map.enableScrollWheelZoom();

      // 用户如果不搜索另外的地理位置，则选取获取当前地理位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          th.userlocation.lng = r.point.lng;
          th.userlocation.lat = r.point.lat;
          var gc = new BMap.Geocoder();
          gc.getLocation(r.point, function (rs) {
            var addComp = rs.addressComponents;
            var address =
              addComp.province +
              addComp.city +
              addComp.district +
              addComp.street +
              addComp.streetNumber; //获取地址
            th.address = address;
          });
        } else {
          this.$message.error("获取当前位置失败：" + this.getStatus());
        }
      });

      //地理位置搜索
      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: "suggestId",
        location: map,
      });
      var myValue;
      ac.addEventListener("onconfirm", function (e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        th.address = myValue;
        setPlace(th.address);
      });
      //地图标点
      function setPlace(address) {
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          th.userlocation = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18);
          map.addOverlay(new BMap.Marker(th.userlocation)); //添加标注
          th.send(th.address, th.userlocation);//将地图组件的数据发送给父组件
        }

        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun,
        });
        local.search(myValue);
        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener("click", function (e) {
          console.log(
            "位置:" +
              address +
              "\n经度:" +
              th.userlocation.lng +
              "\n纬度:" +
              th.userlocation.lat
          );
        });
      }
    });
  },
  methods: {
    send(ad, lo) {
      this.$emit("addressinfo", ad, lo);
    },
  },
};
</script>
<style scoped>
#allmap {
  width: auto;
  height: 400px;
  font-family: "微软雅黑";
}
</style>