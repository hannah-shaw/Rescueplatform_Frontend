<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="求助信息" name="seek">
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <!--标题-->
              <div class="media-content">
                <div class="">
                  <p class="post-content">
                    <span class="is-size-6">描述：{{ item.discription }}address</span>
                  </p>
                  <p class="post-content">
                    <span class="is-size-6">求助人：{{ item.name }}address</span>
                  </p>
                  <p class="post-content">
                    <span class="is-size-6">电话：{{ item.phone }}</span>
                  </p>
                  <p class="post-content">
                    <span class="is-size-6">位置：{{ item.address }}</span>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <!--时间-->
                      <span class="mr-1">
                        发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>
                      <!--核实情况-->
                      <span
                        class="tag  is-danger is-light mr-1"
                      >
                        {{ item.checked }}
                      </span>
                      <!--安全情况-->
                      <span
                        class="tag  is-success is-light mr-1"
                      >
                        {{ item.saved }}
                      </span>
                      <!--浏览量-->
                      <span class="is-hidden-mobile">浏览:{{ item.views }}</span>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
          <el-tab-pane label="帮助信息" name="offer"> </el-tab-pane>
        </el-tabs>
      </div>

      <!--分页-->
      <pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="init"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from "@/components/Layout/Pagination";

export default {
  name: "TopicList",
  components: { Pagination },
  data() {
    return {
      activeName: "seek",
      articleList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: "seek",
      },
    };
  },
  created() {
    this.init(this.tab);
  },
  methods: {
    init(tab) {},
    handleClick(tab) {
      this.page.current = 1;
      this.init(tab.name);
    },
  },
};
</script>

<style scoped>
</style>
