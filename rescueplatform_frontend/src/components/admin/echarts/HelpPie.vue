<template>
<div>
  <div class="com-container" >
    <div id="echarts" class="com-pie"></div>
  </div>
</div>
</template>

<style scoped>
.com-container {
  width: 100%;
  height: 100%;
}

.com-pie {
  width: 500px;
  height: 300px;
  margin-top: 20px;
}
</style>

<script>
import * as echarts from "echarts";
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
      this.chartInstance = echarts.init(document.getElementById("echarts"));
      //this.chartInstance = echarts.init(this.$refs.pie_ref);
      const initOption = {title: {
          text: "基于福州市用户发布位置信息统计",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "鼓楼区" },
              { value: 735, name: "晋安区" },
              { value: 580, name: "台江区" },
              { value: 484, name: "仓山区" },
              { value: 300, name: "长乐区" },
              { value: 300, name: "闽侯县" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
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
  }
};
</script>
