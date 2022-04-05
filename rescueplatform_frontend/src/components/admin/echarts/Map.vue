<!-- 商家分布图表 -->
<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from "axios";
import { getProvinceMapInfo } from "@/utils/map_utils";
import Map from "../../../../public/static/map/china.json";
import InfCard from "@/components/admin/echarts/InfCard";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: [], // 所获取的省份的地图矢量数据
      
    };
  },
  components: {
    "inf-card":InfCard,
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    async initChart() {
      //加载地图数据
      this.chartInstance = this.$echarts.init(this.$refs.map_ref);
      const ret = Map;
      this.$echarts.registerMap("china", ret);
      const initOption = {
        geo: {
          type: "map",
          map: "china",
          top: "5%",
          bottom: "5%",
          itemStyle: {
            borderColor: "#333",
          },
        },
      };
      this.chartInstance.setOption(initOption);
      //获取省份数据
      this.getRequest("/front/seekhelp-post/provinceData", {
        //参数
      }).then((res) => {
        //console.log(res);
        //获取到的数据需要转换成Json字符串,这里我也不是很明白，在控制台调试的时候，获取到的数据都是[object,Object]这样的格式，所以我只能转换一下
        let outdata = JSON.stringify(res);
        //这里还需eval来处理一下字符串转为json对象，如此就能获取到数据了
        let xqo = eval("(" + outdata + ")");
        var getData = [];
        //根据返回的数据，循环遍历出你要展示的数据
        for (var i in xqo) {
          getData.push({
            value: parseInt(xqo[i].num),
            name: xqo[i].province,
          });
        }
        this.mapData = getData;
      });
      this.chartInstance.on("click", async (arg) => {
        //点击事件
      });
    },
    async getData() {
      this.updateChart();
    },
    updateChart() {
      const dataOption = {};
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const adapterOption = {};
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    // 回到中国地图
    revertMap() {
      const revertOption = {
        geo: {
          map: "china",
        },
      };
      this.chartInstance.setOption(revertOption);
    },
  },
};
</script>

<style scoped>
.com-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
}

.com-chart {
  width: 500px;
  height: 300px;
  margin-top: 20px;
  overflow: hidden;
}
</style>
