<template>
  <div>
    <div class="mt-4">
      <div style="display: flex; justify-content: space-between">
        <div>
          <el-input
            prefix-icon="el-icon-search"
            placeholder="请输入求助姓名进行搜索"
            v-model="empName"
            @keydown.enter.native="initEmps('advanced')"
            clearable
            @clear="initEmps"
            style="width: 300px"
          ></el-input>
          <el-button
            style="margin-left: 10px"
            icon="el-icon-search"
            type="primary"
            @click="initEmps('advanced')"
            >搜索</el-button
          >
          <el-button type="primary" @click="showSearch = !showSearch">
            <i
              :class="
                showSearch ? 'fa fa-angle-double-up' : 'fa fa-angle-double-down'
              "
              aria-hidden="true"
            ></i>
            高级搜索
          </el-button>
        </div>
        <div>
          <el-upload
            style="display: inline-flex; margin-right: 8px"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :headers="headers"
            :on-error="onError"
            :disabled="importDataDisabled"
            action="/employee/basic/import"
          >
            <el-button
              type="success"
              :disabled="importDataDisabled"
              :icon="importDataBtnIcon"
            >
              {{ importDataBtnText }}</el-button
            >
          </el-upload>

          <el-button type="success" @click="exportData" icon="el-icon-download">
            导出数据
          </el-button>
        </div>
      </div>
    </div>

    <!--高级搜索栏-->
    <transition name="slide-fade">
      <div
        v-show="showSearch"
        style="
          border: 1px solid #409eff;
          border-radius: 5px;
          box-sizing: border-box;
          padding: 7px;
          margin: 15px 0px;
        "
      >
        <el-row>
          <el-col :span="5">
            省:
            <el-input
              placeholder="请输入省"
              v-model="searchValue.province"
              clearable
              style="width: 180px"
            ></el-input>
          </el-col>
          <el-col :span="5">
            市:
            <el-input
              placeholder="请输入市"
              v-model="searchValue.city"
              clearable
              style="width: 180px"
            ></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="6">
            是否核实:
            <el-radio-group v-model="searchValue.checked">
              <el-radio label="true">核实</el-radio>
              <el-radio label="false">未核实</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="5" :offset="4">
            <el-button
              size="mini"
              icon="el-icon-search"
              type="primary"
              @click="initEmps('advanced')"
              >搜索</el-button
            >
            <el-button size="mini">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </transition>

    <!--表格-->
    <div style="margin-top: 20px">
      <el-table
        :data="seekpost"
        border
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="姓名" align="left" width="80">
        </el-table-column>
        <el-table-column prop="province" label="省" align="left" width="85">
        </el-table-column>
        <el-table-column prop="city" label="市" width="85"> </el-table-column>
        <el-table-column prop="district" label="位置" align="left" width="175">
        </el-table-column>
        <el-table-column
          prop="discription"
          label="描述"
          align="left"
          width="280"
        >
        </el-table-column>
        <el-table-column prop="checked" label="核实" align="left" width="70">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="posx" label="经度" width="100">
        </el-table-column>
        <el-table-column prop="posy" label="纬度" width="100">
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="80">
        </el-table-column>
        <el-table-column prop="createtime" label="发布时间" width="150">

        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              @click="check(scope.row)"
              style="padding: 3px"
              size="mini"
              >核实</el-button
            >
            <el-button
              style="padding: 3px"
              size="mini"
              type="danger"
              @click="deleteSeek(scope.row)"
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
  </div>
</template>

<script>
export default {
  name: "StaAll",
  data() {
    return {
      searchValue: {
        province: "",
        city: "",
        checked: null,
      },
      showSearch: false,
      //用于上传下载
      headers: {
        Authorization: window.sessionStorage.getItem("tokenStr"),
      },
      importDataBtnText: "导入数据",
      importDataBtnIcon: "el-icon-upload2",
      importDataDisabled: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
      //信息列表
      seekpost: [],
      loading: false,
      //分页
      total: 0,
      currentPage: 1,
      size: 10,
      //搜索名字值
      empName: "",
      emp: {},
      visible: false,
      visible2: false,
    };
  },
  mounted() {
    this.initEmps();
  },
  methods: {
    check(data) {
      this.getRequest("/front/help-post/postById?id=" + data.id).then(
        (resp) => {
          if (resp.checked == false) {
            this.putRequest("/front/help-post/check?id=" + data.id).then(
            (resp) => {}
            );
          }
          else{
            this.putRequest("/front/help-post/unCheck?id=" + data.id).then(
            (resp) => {}
           ); 
          }
          this.initEmps();
        }
      );
    },
    //删除
    deleteSeek(data) {
      this.$confirm(
        "此操作将删除[" + data.name + "]的发布的帮助记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteRequest("/front/help-post/delete?id=" + data.id).then(
            (resp) => {
              if (resp) {
                this.initEmps();
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
      this.initEmps();
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initEmps();
    },
    //数据导入导出
    onSuccess() {
      this.importDataBtnText = "导入数据";
      this.importDataDisabled = false;
      this.importDataBtnIcon = "el-icon-upload2";
      console.log("导入数据成功!");
      this.initEmps();
    },
    onError() {
      this.importDataBtnText = "导入数据";
      this.importDataDisabled = false;
      this.importDataBtnIcon = "el-icon-upload2";
    },
    beforeUpload() {
      this.importDataBtnText = "正在导入";
      this.importDataDisabled = true;
      this.importDataBtnIcon = "el-icon-loading";
    },
    exportData() {
      this.downloadRequest("/employee/basic/export");
    },
    //从后台初始化数据
    initEmps(type) {
      this.loading = true;
      let url =
        "/front/help-post/listpage?currentPage=" +
        this.currentPage +
        "&size=" +
        this.size;
      //高级搜索
      if (type && type == "advanced") {
        if (this.searchValue.province) {
          url += "&province=" + this.searchValue.province;
        }
        if (this.searchValue.city) {
          url += "&city=" + this.searchValue.city;
        }
        if (this.searchValue.checked) {
          url += "&checked=" + this.searchValue.checked;
        }
        if (this.empName) {
          url += "&name=" + this.empName;
        }
        console.log(url);
      }
      this.getRequest(url).then((resp) => {
        this.loading = false;
        if (resp) {
          this.seekpost = resp.date;
          this.total = resp.total;
          for (var i = 0; i < this.seekpost.length; i++) {
            if (this.seekpost[i].checked == true) {
              this.seekpost[i].checked = "已核实";
            } else {
              this.seekpost[i].checked = "未核实";
            }
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>