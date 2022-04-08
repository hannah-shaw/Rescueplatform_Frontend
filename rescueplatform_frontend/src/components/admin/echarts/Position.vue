<template>
  <div>
    <div class="com-container">
      <div id="echartsH" class="com-pie"></div>
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
      this.chartInstance = echarts.init(document.getElementById("echartsH"));
      var initOption = {
        title: {
          text: "志愿者 技能点统计",
          left: "left",
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
      this.chartInstance = echarts.init(document.getElementById("echartsH"));
      var getData = [];
      var that = this;
      that
        .getRequest("/employee/basic/get-all-Position-Num", {
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
          var maxData = [];
          var values = [];
          var all = 0;
          for (var i in xqo) {
            values.push(parseInt(xqo[i].num));
            all+=parseInt(xqo[i].num);
          }
          //根据返回的数据，循环遍历出你要展示的数据
            getData.push({
              value: values,
            });
          for (var i in xqo) {
            maxData.push({
              max: all/2,
              name: xqo[i].position,
            });
          }
          that.initChart(getData, maxData);
        });
    },
    initChart(alData, maxData) {
      console.log(alData)
      this.chartInstance.setOption({
        radar: {
          //shape: 'circle',
          indicator: maxData,
        },
        series: [
          {
            name: "发布数量",
            type: "radar",
            data: alData,
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
