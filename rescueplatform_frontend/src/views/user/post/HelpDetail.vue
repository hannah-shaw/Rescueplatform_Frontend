<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div class="columns">
        <div class="column is-full">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <div class="has-text-grey is-size-7 mt-3">
                <span>{{
                  dayjs(topic.createtime).format("YYYY/MM/DD")
                }}</span>
                <el-divider direction="vertical" />
                <span>浏览量：{{ topic.views }}</span>
              </div>
            </div>
            <div>
              <p class="is-size-6 level-left">描述：{{ topic.discription }}</p>
              <p class="is-size-6 level-left">联系人姓名:{{ topic.name }}</p>
              <p class="is-size-6 level-left">联系方式：{{ topic.phone }}</p>
              <p class="mb-5 level-left">
                具体位置：{{ topic.province + topic.city + topic.district }}
              </p>
              <div class="smap">
                <div id="allmap" class="Map" />
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "HelpDetail",
  components: { Header, Footer },
  data() {
    return {
      flag: false,
      topic: {
        id: this.$route.query.id,
        name: "",
        phone: "",
        discription: "",
        posx: 0,
        posy: 0,
        district: "",
        province: "",
        city: "",
        check: false,
        createtime: "",
        view: 0,
      },
      refresh: true,
    };
  },
  mounted() {
    this.refreshComp();
    this.fetchTopic();
  },
  methods: {
    // 根据传入id初始化数据,根据数据地图标点
    fetchTopic() {
      this.getRequest(
        "/front/help-post/postById?id=" + this.$route.query.id
      ).then((resp) => {
        this.topic = resp;
        var map = new BMap.Map("allmap"); //初始化map, 绑定id=allmap
        var normalpoint = new BMap.Point(121.48789949, 31.24916171); // 初始化point, 给定一个默认x,y值
        map.centerAndZoom(normalpoint, 16); // 将point点放入map中，展示在页面中心展示，10=缩放程度
        map.enableScrollWheelZoom(); // 开启滚动鼠标滑轮
        let point = new BMap.Point(this.topic.posx, this.topic.posy);
        let markers = new BMap.Marker(point);
        map.centerAndZoom(point, 16); // 将point点放入map中，展示在页面中心展示，10=缩放程度
        map.addOverlay(markers); // 将标注添加到地图中
      });
    },
    //解决vue页头懒加载导致组件错位的问题
    refreshComp() {
      // 移除组件
      this.refresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.refresh = true;
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
