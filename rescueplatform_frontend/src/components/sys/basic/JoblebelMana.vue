<template>
  <div>
    <div>
      <el-input
        v-model="jl.name"
        size="small"
        placeholder="添加职位"
        prefix-icon="el-icon-plus"
        style="width: 300px"
      >
      </el-input>
      <el-select
        size="small"
        v-model="jl.titleLevel"
        placeholder="职称等级"
        style="margin-left: 10px; margin-right: 10px"
      >
        <el-option
          v-for="item in titleLevels"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="addJobLevel"
        >添加</el-button
      >
      <el-button
        size="small"
        type="danger"
        :disabled="multipleSelection.length == 0"
        @click="deleteMany"
        >批量删除</el-button
      >
    </div>
    <div>
      <el-table
        :data="jls"
        size="small"
        stripe
        border
        style="width: 70%; margin-top: 10px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="职称名" width="180">
        </el-table-column>
        <el-table-column prop="titleLevel" label="职称等级" width="150">
        </el-table-column>
        <el-table-column prop="createDate" label="创建日期" width="150">
        </el-table-column>
        <el-table-column prop="enabled" label="是否启用" width="150">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditView(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="deleteJobLevel(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑职称" :visible.sync="dialogVisible" width="30%">
      <table>
        <tr>
          <td><el-tag>职位名称</el-tag></td>
          <td>
            <el-input
              v-model="updateJl.name"
              size="small"
              style="width: 180px"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td><el-tag>职位等级</el-tag></td>
          <td>
            <el-select
              size="small"
              v-model="updateJl.titleLevel"
              placeholder="职称等级"
              style="margin-left: 10px; margin-right: 10px"
            >
              <el-option
                v-for="item in titleLevels"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td><el-tag>是否启用</el-tag></td>
          <td>
            <el-switch
              style="display: block"
              v-model="updateJl.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="已启用"
              inactive-text="未启用"
            >
            </el-switch>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doupdate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "JoblebelMana",
  data() {
    return {
      jl: {
        name: "",
        titleLevel: "",
      },
      titleLevels: ["正高级", "副高级", "中级", "初级", "员级"],
      jls: [],
      dialogVisible: false,
      updateJl: {
        name: "",
        titleLevel: "",
        enabled: false,
      },
      multipleSelection: [],
    };
  },
  mounted() {
    this.initJls();
  },
  methods: {
    deleteMany() {
      this.$confirm(
        "删除[" + this.multipleSelection.length + "]个职位, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let ids = "?";
          this.multipleSelection.forEach((item) => {
            ids += "ids=" + item.id + "&";
          });
          this.deleteRequest("/system/basic/joblevel/delete/ids" + ids).then(
            (res) => {
              if (res) {
                this.initJls();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    doupdate() {
      this.putRequest("/system/basic/joblevel/update", this.updateJl).then(
        (resp) => {
          if (resp) {
            this.initJls();
            this.dialogVisible = false;
          }
        }
      );
    },
    showEditView(data) {
      Object.assign(this.updateJl, data);
      this.dialogVisible = true;
      this.updateJl.createDate = "";
    },
    deleteJobLevel(index, data) {
      this.$confirm("删除[" + data.name + "]职位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("/system/basic/joblevel/delete", {
            id: data.id,
          }).then((res) => {
            if (res) {
              this.initJls();
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
    addJobLevel() {
      if (this.jl.name && this.jl.titleLevel) {
        this.postRequest("/system/basic/joblevel/add", this.jl).then((resp) => {
          if (resp) {
            this.initJls();
          } else {
            this.$message.error("添加字段不能为空!");
          }
        });
      }
    },

    initJls() {
      this.getRequest("/system/basic/joblevel/list").then((resp) => {
        if (resp) {
          this.jls = resp;
          this.jl.name = "";
          this.jl.titleLevel = "";
        }
      });
    },
  },
};
</script>

<style>
</style>