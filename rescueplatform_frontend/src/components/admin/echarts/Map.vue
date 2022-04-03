<!-- 商家分布图表 -->
<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from "axios";
import Map from "../../../../public/static/map/china.json";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: {}, // 所获取的省份的地图矢量数据
    };
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
}

.com-chart {
  width: 500px;
  height: 300px;
  margin-top: 20px;
  overflow: hidden;
}
</style>
