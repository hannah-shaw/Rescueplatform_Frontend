<template>
  <div>
    <div class="permissMana">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template size="small" slot="prepend">Role_</template>
      </el-input>
      <el-input
        size="small"
        placeholder="请输入角色中文名"
        v-model="role.nameZh"
        @keydown.enter.native="doAddRole"
      >
      </el-input>
      <el-button size="small" type="primary" @click="doAddRole"
        >添加角色</el-button
      >
    </div>
    <el-card class="box-card" style="width: 65%; margin-top: 10px">
      <div class="permissManaMain">
        <el-collapse v-model="activeName" accordion @change="change">
          <el-collapse-item
            :title="r.nameZh"
            :name="r.id"
            v-for="(r, index) in roles"
            :key="index"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>可访问资源</span>
                <el-button
                  style="float: right; padding: 3px 0; color: #ff0000"
                  icon="el-icon-delete"
                  type="text"
                  @click="doDeleteRole(r)"
                ></el-button>
              </div>
              <div>
                <el-tree
                  show-checkbox
                  ref="tree"
                  :data="allMenus"
                  :props="defaultProps"
                  :default-checked-keys="selectedMenus"
                  :key="index"
                  node-key="id"
                ></el-tree>
                <div style="display: flex; justify-content: flex-end">
                  <el-button size="mini" @click="cancelUpdate"
                    >取消修改</el-button
                  >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="doUpdate(r.id, index)"
                    >确认修改</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PermissMana",
  data() {
    return {
      role: {
        name: "",
        nameZh: "",
      },
      roles: [],
      allMenus: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      selectedMenus: [],
      activeName: -1,
    };
  },
  mounted() {
    this.initRoles();
  },
  methods: {
    doDeleteRole(role) {
      this.$confirm("删除[" + role.nameZh + "]角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("/system/basic/permission/delete", {
            id: role.id,
          }).then((res) => {
            if (res) {
              this.initRoles();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    doAddRole() {
      if (this.role.name && this.role.nameZh) {
        this.postRequest("/system/basic/permission/add", this.role).then(
          (resp) => {
            if (resp) {
              this.initRoles();
              this.role.name = "";
              this.role.nameZh = "";
            }
          }
        );
      } else {
        this.$message.error("所有字段不能为空!");
      }
    },
    cancelUpdate() {
      this.activeName = -1;
    },
    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      let selectedKeys = tree.getCheckedKeys(true);
      let url = "/system/basic/permission/updatemenus/?rid=" + rid;
      selectedKeys.forEach((key) => {
        url += "&mids=" + key;
      });
      this.putRequest(url).then((resp) => {
        if (resp) {
          this.initRoles();
          this.activeName = -1;
        }
      });
    },
    change(rid) {
      if (rid) {
        this.selectedMenus = [];
        this.initAllMenus();
        this.initSelectedMenus(rid);
      }
    },
    initSelectedMenus(rid) {
      let url = "/system/basic/permission/mid/?rid=" + rid;
      this.getRequest(url).then((resp) => {
        console.log(resp);
        this.selectedMenus = resp;
      });
    },
    initAllMenus() {
      this.getRequest("/system/basic/permission/menus").then((resp) => {
        if (resp) {
          this.allMenus = resp;
        }
      });
    },
    initRoles() {
      this.getRequest("/system/basic/permission/list").then((resp) => {
        if (resp) {
          this.roles = resp;
        }
      });
    },
  },
};
</script>

<style scoped>
.permissMana {
  display: flex;
  justify-content: flex-start;
}
.permissMana .el-input {
  width: 300px;
  margin-right: 6px;
}
.permissManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>