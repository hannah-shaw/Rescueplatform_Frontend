<template>
  <div>
    <!--发布-->
    <div class="mt-4">
      <div style="display: flex; justify-content: space-between">
          <el-button
            type="primary"
            icon="el-buttton-plus"
            @click="showAddNotice"
            >发布通知</el-button
          >
        </div>
    </div>
    <!--表格-->
    <div style="margin-top: 20px">
      <el-table
        :data="notices"
        border
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="title" label="通知内容" align="left" width="550">
        </el-table-column>
        <el-table-column prop="adminid" label="管理员id" align="left" width="100">
        </el-table-column>
        <el-table-column prop="createtime" label="发布时间" width="200">

        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              style="padding: 3px"
              type="danger"
              @click="deleteNotice(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="title" width="80%">
      <div>
        <el-form ref="empForm" :model="notice" :rules="rules">
          <el-row>
            <el-col :span="7">
              <el-form-item label="通知内容" prop="title">
                <el-input
                  prefix-icon="el-icon-edit"
                  v-model="notice.title"
                  placeholder="请输入通知内容"
                  style="width: 1000px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNotice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SysCfg",
  data() {
    return {
      title: "",
      dialogVisible: false,
      notice:{
        id:0,
        title:"",
        adminid:1,
        createtime:"",
      },
      notices:[],
      admins:[],
      loading: false,
      //分页
      total: 0,
      currentPage: 1,
      size: 10,
      rules: {
        notice: [{ required: true, message: "请输入通知内容", trigger: "blur" }],
      }
    }
  },
  mounted() {
    this.initAdmins();
  },
  methods:{
    showAddNotice() {
      this.title = "发布通知";
      this.dialogVisible = true;
    },
    initAdmins() {
      this.getRequest("/system/admin/list").then((resp) => {
        if (resp) {
          this.admins = resp;
        }
      });
      this.initNotice();
    },
    initNotice(){
      this.getRequest("/front/notice/list").then((resp) => {
        if (resp) {
          this.notices = resp;
          for(var i = 0; i<this.notices.length;i++){
            for(var j = 0;j<this.admins.length;j++){
              if(this.notices[i].adminid == this.admins[j].id){
                this.notices[i].adminid = this.admins[j].name
              }
            }
          }
        }
      });
    },
    addNotice() {
      this.$refs["empForm"].validate((valid) => {
          if (valid) {
            this.postRequest("/front/notice/add", this.notice).then(
              (resp) => {
                if (resp) {
                  this.dialogVisible = false;
                  this.initAdmins();
                }
              }
            );
            console.log(this.emp);
          }
        });
    },
    //删除
    deleteNotice(data) {
      this.$confirm(
        "此操作将删除这条通知, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteRequest("/front/notice/delete?id=" + data.id).then(
            (resp) => {
              if (resp) {
                this.initAdmins();
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
    //分页函数
    sizeChange(size) {
      this.size = size;
      this.initAdmins();
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initAdmins();
    },
  },
};
</script>

<style>
</style>