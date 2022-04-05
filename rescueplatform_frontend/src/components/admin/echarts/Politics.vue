<template>
  <div>
    <div class="com-container">
      <div id="echartPo" class="com-pie"></div>
    </div>
  </div>
</template>

<style scoped>
.com-container {
  width: 100%;
  height: 100%;
}

.com-pie {
  width: 1100px;
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
      allData: [],
      mapData: {}, // 所获取的省份的地图矢量数据
      isProvince: true,
    };
  },
  mounted() {
    this.initData();
    //this.initChart();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    drawPie() {
      //加载地图数据
      this.chartInstance = echarts.init(
        document.getElementById("echartPo")
      );
      var initOption = {
        title: {
          text: "志愿队员政治面貌",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
      };
      this.chartInstance.setOption(initOption);
    },
    async initData() {
      this.drawPie();
      //加载地图数据
      this.chartInstance = echarts.init(
        document.getElementById("echartPo")
      );
      var getData = [];
      var that = this;
      that
        .getRequest("/employee/basic/get-all-politics-Num", {
          //参数
        })
        .then((res) => {
          //console.log(res);
          that.isProvince = true;
          //获取到的数据需要转换成Json字符串,这里我也不是很明白，在控制台调试的时候，获取到的数据都是[object,Object]这样的格式，所以我只能转换一下
          let outdata = JSON.stringify(res);
          //这里还需eval来处理一下字符串转为json对象，如此就能获取到数据了
          let xqo = eval("(" + outdata + ")");
          var getData = [];
          var x = [];
          var yData = [];
          //根据返回的数据，循环遍历出你要展示的数据
          for (var i in xqo) {
            getData.push({
              value: parseInt(xqo[i].num),
              name: xqo[i].nation,
            });
            x[i] = xqo[i].nation;
            yData[i] = xqo[i].num;
          }
          that.initChart(x, yData);
          //that.initChart(getData);
        });
    },
    initChart(x,y) {
      this.chartInstance.setOption({
        xAxis: {
          type: "category",
          data: x,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: y,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
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
  },
};
</script>
