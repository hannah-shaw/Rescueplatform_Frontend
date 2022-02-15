<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">应急信息平台管理系统</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu
              :index="1"
              v-for="(item, index) in this.$store.state.routes"
              :key="index"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="children.path"
                v-for="(children, indexj) in item.children"
                :key="indexj"
              >
                {{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main> <router-view /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    },
  },
};
</script>
<style scoped>
.homeHeader {
  background-color: #769ec5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title {
  font-size: 30px;
  font-family: 华文楷体;
  color: #FFFFFF;
}
.homeHeader .userInfo {
  cursor: pointer;
}
.homeHeader .userInfo img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}
.homeWelcome {
  text-align: center;
  font-size: 30px;
  font-family: "华文楷体";
  color: #769ec5;
  padding-top: 50px;
}
.homeRouterView {
  margin-top: 20px;
}
.el-dropdown-link{
  display: flex;
  align-items: center;
}
.el-dropdown-link img{
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 10px;
}
</style>