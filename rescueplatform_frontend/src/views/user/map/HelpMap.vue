<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>

    <div class="container context">
        <div class="box m-2">
          <Map></Map>
        </div>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import PostButton from "@/components/user/post/PostButton"
import Map from '@/components/map/HelpMap'
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "HelpMap",
  components: {PostButton,Map,Header,Footer},
 
    data() {
    return {
      refresh: true,
    };
  },
  created() {
    this.refreshComp();
  },
  methods: {
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
.container {
  min-height: 500px;
}
</style>