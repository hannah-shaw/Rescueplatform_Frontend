<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title mt-7">应急平台管理系统</div>
        <div>
          <el-button
            icon="el-icon-chat-line-square"
            size="normal"
            style="margin-right: 20px"
            @click="goChat"
          ></el-button>
          <el-dropdown class="userInfo" @command="commandHandler">
            <span class="el-dropdown-link" style="color: white">
              {{ user.name }}<i><img :src="user.userFace" alt="" /></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="logout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in routes"
              :key="index"
            >
              <template slot="title">
                <i
                  :class="item.iconCls"
                  style="color: #769ec5; margin-right: 5px"
                ></i>
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
        <el-main>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="this.$router.currentRoute.path != '/home'"
          >
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{
              this.$router.currentRoute.name
            }}</el-breadcrumb-item>
            </el-breadcrumb
          >
          <div
            class="homeWelcome"
            v-if="this.$router.currentRoute.path == '/home'"
          >
           欢迎来到应急管理平台
          </div>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
    };
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    },
  },
  methods: {
    goChat() {
      this.$router.push("/chat");
    },
    commandHandler(command) {
      if (command == "logout") {
        this.$confirm("此操作将注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            //  注销登录
            this.postRequest("/logout");
            //清空用户信息
            window.sessionStorage.removeItem("user");
            window.sessionStorage.removeItem("tokenStr");
            //  清空菜单
            this.$store.commit("initRoutes", []);
            // 跳转到登录页面
            this.$router.replace("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消注销登录",
            });
          });
      } else if (command == "userinfo") {
        this.$router.push("/userinfo");
      }
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
  color: #ffffff;
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
  font-family: 华文楷体;
  color: #769ec5;
  padding-top: 50px;
}
.homeRouterView {
  margin-top: 20px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 10px;
}
</style>