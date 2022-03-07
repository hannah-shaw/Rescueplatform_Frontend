<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div class="box">🔔 {{ billboard.content }}</div>
        <div class="column ">
          <PostButton></PostButton>
        </div>
        <div class="column ">
          <TopicList></TopicList>
        </div>
    </div>

    <div>
      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import PostButton from "@/components/user/post/PostButton"
import PostList from '@/views/user/post/Index'
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "Home",
  components: {PostButton, TopicList: PostList,Header, Footer},
  data() {
    return {
      billboard: {
        content: "",
      },
      refresh: true,
    };
  },
  created() {
    this.refreshComp();
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      /*
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
      */
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
