<template>
  <div>
    <div>
      <el-input
        size="small"
        placeholder="添加职位"
        prefix-icon="el-icon-plus"
        v-model="pos.name"
        class="addPosInput"
        @keydown.enter.native="addPosition"
      >
      </el-input>
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="addPosition"
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
        size="small"
        stripe
        border
        :data="positions"
        style="width: 75%"
        class="posManaMain"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="职位" width="120">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="enabled" label="是否启用" width="120">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑职位" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input
          v-model="updatePos.name"
          size="small"
          class="updataPosInput"
        ></el-input>
      </div>
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
  name: "PosMana",
  data() {
    return {
      pos: {
        name: "",
      },
      positions: [],
      //弹出框显示
      dialogVisible: false,
      updatePos: {
        name: "",
      },
      multipleSelection: [],
    };
  },
  mounted() {
    this.initPositions();
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
          this.deleteRequest("/system/basic/position/deletes" + ids).then(
            (res) => {
              if (res) {
                this.initPositions();
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
      this.putRequest("/system/basic/position/update", this.updatePos).then(
        (resp) => {
          if (resp) {
            this.initPositions();
            this.dialogVisible = false;
          }
        }
      );
    },
    addPosition() {
      if (this.pos.name) {
        this.postRequest("/system/basic/position/add", this.pos).then(
          (resp) => {
            if (resp) {
              this.initPositions();
              this.pos.name = "";
            }
          }
        );
      } else {
        this.$message.error("职位名称不能为空!");
      }
    },
    handleEdit(index, data) {
      Object.assign(this.updatePos, data);
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      this.$confirm("删除[" + data.name + "]职位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(data);
          this.deleteRequest("/system/basic/position/delete/", {
            id: data.id,
          }).then((res) => {
            if (res) {
              this.initPositions();
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
    initPositions() {
      this.getRequest("/system/basic/position/list").then((resp) => {
        if (resp) {
          this.positions = resp;
        }
      });
    },
  },
};
</script>

<style>
.addPosInput {
  width: 300px;
  margin-right: 10px;
}
.posManaMain {
  margin-top: 10px;
}
.updataPosInput {
  width: 180px;
  margin-left: 10px;
}
</style>