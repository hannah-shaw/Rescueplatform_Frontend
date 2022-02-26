<template>
  <div>
    <div style="width: 500px">
      <el-input
        placeholder="输入需要搜索的内容"
        prefix-icon="el-icon-search"
        v-model="filterText"
      >
      </el-input>

      <el-tree
        style="margin-top: 20px"
        :data="deps"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        ref="tree"
      >
        <span
          slot-scope="{ node, data }"
          style="display: flex; justify-content: space-between; width: 100%"
        >
          <span>{{ node.label }}</span>
          <span>
            <el-button
              style="padding: 2px"
              type="primary"
              size="mini"
              @click="() => showAddDep(data)"
            >
              添加部门
            </el-button>
            <el-button
              style="padding: 2px"
              type="danger"
              size="mini"
              @click="() => deleteDep(data)"
            >
              删除部门
            </el-button>
          </span>
        </span>
      </el-tree>
      <el-dialog title="添加部门" :visible.sync="dialogVisible" width="30%">
        <div>
          <table>
            <tr>
              <td><el-tag>上级部门</el-tag></td>
              <td>{{ pname }}</td>
            </tr>
            <tr>
              <td><el-tag>部门名称</el-tag></td>
              <td>
                <el-input
                  v-model="dep.name"
                  placeholder="请输入部门名称"
                ></el-input>
              </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddDep">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepMana",
  data() {
    return {
      filterText: "",
      deps: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      dialogVisible: false,
      dep: {
        name: "",
        parentId: "",
      },
      pname: "",
    };
  },
  mounted() {
    this.initDeps();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    removeDepFromDeps(p, deps, id) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i];
        if (d.id == id) {
          deps.splice(i, 1);
          if (deps.length == 0) {
            p.isParent = false;
          }
          return;
        } else {
          this.removeDepFromDeps(d, d.children, id);
        }
      }
    },
    deleteDep(data) {
      if (data.isParent) {
        this.$message.error("父部门删除失败!");
      } else {
        this.$confirm(
          "此操作将删除[" + data.name + "]部门, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.deleteRequest(
              "/system/basic/department/delete?id=" + data.id
            ).then((resp) => {
              if (resp) {
                this.removeDepFromDeps(null, this.deps, data.id);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },

    doAddDep() {
      this.postRequest("/system/basic/department/add", this.dep).then(
        (resp) => {
          if (resp) {
            this.initDeps();
            this.dialogVisible = false;
          }
        }
      );
    },
    showAddDep(data) {
      console.log();
      this.dialogVisible = true;
      this.pname = data.name;
      this.dep.parentId = data.id;
    },
    initDeps() {
      this.getRequest("/system/basic/department/list").then((resp) => {
        if (resp) {
          this.deps = resp;
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
  },
};
</script>

<style>
</style>