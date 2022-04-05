<template>
  <el-card class="box-card">
    <div :class="'title'">
      <i class="el-icon-bell"></i>
      公告板
    </div>
    <div :class="'wrap'">
      <p>👩‍💻各位尊敬的管理员：</p>
      <div :class="'divider'"></div>
      <p><el-tag>请及时核实求助以及物资信息</el-tag></p>
      <div :class="'divider'"></div>
      <p>总 求助 信息数量: <el-tag type="danger" size="mini">{{allSeekNum}}</el-tag></p>
      
      <div :class="'divider'"></div>
      <p>未核实 求助 信息数量:<el-tag type="danger" size="mini">{{noCheckedSeekNum}}</el-tag></p>
      
      <div :class="'divider'"></div>
      <p>未救援 求助 信息数量:<el-tag type="danger" size="mini">{{noSafedSeekNum}}</el-tag></p>
      
      <div :class="'divider'"></div>
      <p>总 物资/志愿 信息数量:<el-tag type="danger" size="mini">{{allHelpNum}}</el-tag></p>
      
      <div :class="'divider'"></div>
      <p>未核实 物资/志愿 信息数量:<el-tag type="danger" size="mini">{{noCheckedHelpNum}}</el-tag></p>
    
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      allSeekNum: 0,
      noCheckedSeekNum: 0,
      noSafedSeekNum: 0,
      allHelpNum: 0,
      noCheckedHelpNum: 0,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
        //获取所有求助帖子数量
      this.getRequest("/front/seekhelp-post/listNum", {
        //参数
      }).then((res) => {
          console.log(res)
          this.allSeekNum = res 
      });

      //获取未核实求助帖子数量
      this.getRequest("/front/seekhelp-post/noCheckedNum", {
        //参数
      }).then((res) => {
          this.noCheckedSeekNum = res 
      });

      //获取未救援求助帖子数量
      this.getRequest("/front/seekhelp-post/nosafedNum", {
        //参数
      }).then((res) => {
          this.noSafedSeekNum = res 
      });

      //获取所有帮助帖子数量
      this.getRequest("/front/help-post/listNum", {
        //参数
      }).then((res) => {
          this.allHelpNum = res 
      });

      //获取未核实帮助帖子数量
      this.getRequest("/front/help-post/noCheckedNum", {
        //参数
      }).then((res) => {
          this.noCheckedHelpNum = res 
      });
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 20px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 320px;
  height: auto;
  margin: 10px;
}

.title {
  margin: 10px;
}
.rowcard {
  display: flex;
  justify-content: center;
}
.item {
  margin: 5px 10px;
  border-radius: 3px;
  background: #dddddd;
  width: 240px;
  height: 60px;
  display: inline-block;
}
.divider {
  width: 100%;
  height: 1px;
  background: #dcdfe6;
  margin: 5px 0;
}
</style>