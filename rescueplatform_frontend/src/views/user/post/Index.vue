<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="求助信息" name="seek">
            <article
              v-for="(item, index) in seekArticleList"
              :key="index"
              class="media"
            >
              <div class="media-content">
                <div class="post-main">
                  <p class="level-left mt-2">
                      <el-link  class="is-size-5" @click="jumpDetail(item.id)"> 情况：{{ item.description }} </el-link>
                  </p>
                  <p class="level-left mt-2">
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
                      <span class="tag is-danger is-light mr-1">
                        {{ item.checked }}
                      </span>
                      <!--安全情况-->
                      <span class="tag is-success is-light mr-1">
                        {{ item.saved }}
                      </span>
                      <!--浏览量-->
                      <span class="is-hidden-mobile"
                        >浏览:{{ item.views }}</span
                      >
                    </div>
                  </div>
                </nav>
              </div>
            </article>
          </el-tab-pane>
          <el-tab-pane label="帮助信息" name="offer">
            <article
              v-for="(item, index) in offerArticleList"
              :key="index"
              class="media"
            >
              <div class="media-content">
                <div class="post-main">
                  <p class="level-left mt-2">
                    <span class="is-size-6">详情：{{ item.description }}</span>
                  </p>
                  <p class="level-left mt-2">
                    <span class="is-size-6">帮助者：{{ item.name }}</span>
                  </p>
                  <p class="level-left mt-2">
                    <span class="is-size-6">电话：{{ item.phone }}</span>
                  </p>
                  <p class="level-left mt-2">
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
                      <span class="tag is-danger is-light mr-1">
                        {{ item.checked }}
                      </span>
                      <!--浏览量-->
                      <span class="is-hidden-mobile"
                        >浏览:{{ item.views }}</span
                      >
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
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
      seekArticleList: [
        {
          id: "0",
          description: "111",
          name: "1",
          phone: "1",
          address: "1",
          createTime: "2022-01-28 13:56:01",
          checked: "1",
          saved: "1",
          views: "1",
        },
        {
          id: "1",
          description: "111",
          name: "1",
          phone: "1",
          address: "1",
          createTime: "2022-01-28 13:56:01",
          checked: "1",
          saved: "1",
          views: "1",
        },
        {
          id: "2",
          description: "1",
          name: "1",
          phone: "1",
          address: "1",
          createTime: "2022-01-28 13:56:01",
          checked: "1",
          saved: "1",
          views: "1",
        },
        {
          id: "3",
          description: "1",
          name: "1",
          phone: "1",
          address: "1",
          createTime: "2022-01-28 13:56:01",
          checked: "1",
          saved: "1",
          views: "1",
        },
      ],
      offerArticleList: [
        {
          id: "0",
          description: "1",
          name: "1",
          phone: "1",
          address: "1",
          createTime: "2022-01-28 13:56:01",
          checked: "1",
          views: "1",
        },
      ],
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
    jumpDetail(id){
      this.$router.push({ path: "/detail?key=" + id });
    },
    // 字符串截取 包含对中文处理,str需截取字符串,start开始截取位置,n截取长度
    Substr(str, start, n) {
      // eslint-disable-line
      if (str.replace(/[\u4e00-\u9fa5]/g, "**").length <= n) {
        return str;
      }
      let len = 0;
      let tmpStr = "";
      for (let i = start; i < str.length; i++) {
        // 遍历字符串
        if (/[\u4e00-\u9fa5]/.test(str[i])) {
          // 中文 长度为两字节
          len += 2;
        } else {
          len += 1;
        }
        if (len > n) {
          break;
        } else {
          tmpStr += str[i];
        }
      }
      return tmpStr + "...";
    },
  },
};
</script>

<style scoped>
</style>
