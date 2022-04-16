<template>
  <div>
    <div class="com-container">
      <div id="echartsSH" class="com-pie"></div>
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
      this.chartInstance = echarts.init(document.getElementById("echartsSH"));
      var initOption = {
        title: {
          text: "用户发布求助信息统计",
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
      this.chartInstance = echarts.init(document.getElementById("echartsSH"));
      var getData = [];
      var that = this;
      that
        .getRequest("/front/seekhelp-post/provinceData", {
          //参数
        })
        .then((res) => {
          that.isProvince = true;
          //获取到的数据需要转换成Json字符串
          let outdata = JSON.stringify(res);
          //eval处理一下字符串转为json对象，获取到数据
          let xqo = eval("(" + outdata + ")");
          var getData = [];
          //根据返回的数据，循环遍历出要展示的数据
          for (var i in xqo) {
            getData.push({
              value: parseInt(xqo[i].num),
              name: xqo[i].province,
            });
          }
          that.allData = getData;
          that.initChart(getData);
        });

      this.chartInstance.on("click", function (param) {
        if (that.isProvince == true) {
          that
            .getRequest("/front/seekhelp-post/cityData/" + param.data.name)
            .then((res) => {
              if (res != null) {
                that.isProvince = false;
                let outdata = JSON.stringify(res);
                let xqo = eval("(" + outdata + ")");
                var getCityData = [];
                for (var i in xqo) {
                  getCityData.push({
                    value: parseInt(xqo[i].num),
                    name: xqo[i].city,
                  });
                }
                that.allData = getCityData;
                that.initChart(getCityData);
              }
            });
        } else if (that.isProvince == false) {
          that.initData();
        }
      });
    },
    initChart(alData) {
      this.chartInstance.setOption({
        series: [
          {
            name: "发布数量",
            type: "pie",
            radius: "50%",
            data: alData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
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
