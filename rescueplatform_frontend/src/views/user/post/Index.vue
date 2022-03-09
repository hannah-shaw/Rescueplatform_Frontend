<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="求助信息" name="seek">
            <article
              v-for="(item, index) in seekData"
              :key="index"
              class="media"
            >
              <div class="media-content">
                <div class="post-main">
                  <p class="level-left mt-2">
                    <el-link class="is-size-6" @click="jumpDetail(item.id)">
                      情况：{{ item.discription }}
                    </el-link>
                  </p>
                  <p class="level-left mt-2">
                    <span class="is-size-6"
                      >位置：{{
                        item.province + item.city + item.district
                      }}</span
                    >
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <!--时间-->
                      <span class="mr-1">
                        发布于:{{ dayjs(item.createtime).format("YYYY/MM/DD") }}
                      </span>
                      <!--核实情况-->
                      <span class="tag is-danger is-light mr-1">
                        {{ item.checked }}
                      </span>
                      <!--安全情况-->
                      <span class="tag is-success is-light mr-1">
                        {{ item.safed }}
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
              v-for="(item, index) in offerData"
              :key="index"
              class="media"
            >
              <div class="media-content">
                <div class="post-main">
                  <p class="level-left mt-2">
                    <el-link class="is-size-6" @click="jumpDetail(item.id)">
                      情况：{{ item.discription }}
                    </el-link>
                  </p>
                  <p class="level-left mt-2">
                    <span class="is-size-6">帮助者：{{ item.name }}</span>
                  </p>
                  <p class="level-left mt-2">
                    <span class="is-size-6">电话：{{ item.phone }}</span>
                  </p>
                  <p class="level-left mt-2">
                    <span class="is-size-6"
                      >位置：{{
                        item.province + item.city + item.district
                      }}</span
                    >
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <!--时间-->
                      <span class="mr-1">
                        发布于:{{ dayjs(item.createtime).format("YYYY/MM/DD") }}
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

      <div style="display: flex; justify-content: flex-end">
        <el-pagination
          background
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="sizes, prev, pager, next, jumper, ->, total"
          :total="total"
        >
        </el-pagination>
      </div>
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
      seekData: [],
      offerData: [],
      page: {
        current: 1,
        size: 10,
        tab: "seek",
      },
      total:0,
    };
  },
  created() {
    this.init(this.activeName);
  },
  methods: {
    init(tab) {
      if (tab == "seek") {
        this.getRequest("/front/seekhelp-post/listNum").then((resp) => {
            this.total = resp/this.page.size + 1
        });
        let url =
          "/front/seekhelp-post/listpage?currentPage=" +
          this.page.current +
          "&size=" +
          this.page.size;
        this.getRequest(url).then((resp) => {
          if (resp) {
            this.seekData = resp.date;
            for (var i = 0; i < this.seekData.length; i++) {
              if (this.seekData[i].checked == false) {
                this.seekData[i].checked = "未核实";
              } else {
                this.seekData[i].checked = "已核实";
              }
              if (this.seekData[i].safed == false) {
                this.seekData[i].safed = "未获救";
              } else {
                this.seekData[i].safed = "已获救";
              }
            }
          }
        });
      } else if (tab == "offer") {
        this.getRequest("/front/help-post/listNum").then((resp) => {
            this.total = resp/this.page.size + 1
        });
        let url =
          "/front/help-post/listpage?currentPage=" +
          this.page.current +
          "&size=" +
          this.page.size;
        this.getRequest(url).then((resp) => {
          if (resp) {
            this.offerData = resp.date;
            for (var i = 0; i < this.offerData.length; i++) {
              if (this.offerData[i].checked == false) {
                this.offerData[i].checked = "未核实";
              } else {
                this.offerData[i].checked = "已核实";
              }
            }
          }
        });
      }
    },
    sizeChange(size) {
      this.page.size = size;
      this.init(this.activeName);
    },
    currentChange(currentPage) {
      this.page.current = currentPage;
      this.init(this.activeName);
    },
    handleClick(tab) {
      this.page.current = 1;
      this.init(tab.name);
    },
    jumpDetail(postid) {
      if(this.activeName == "seek"){
        this.$router.push({ path: "/seekdetail", query: { id: postid }});
      }else if (this.activeName == "offer"){
        this.$router.push({ path: "/helpdetail", query: { id: postid }});
      }
      
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
