<template>
  <el-card class="box-card">
    <div :class="'title'">
      <i class="el-icon-bell"></i>
      公告板
    </div>
    <div :class="'wrap'">
      <p>👩‍💻各位尊敬的管理员：</p>
      <div :class="'divider'"></div>
      <p> ❗请随时注意紧急情况的发生</p>
      <div :class="'divider'"></div>
      <p> ❗及时核实用户发布信息</p>
      <div :class="'divider'"></div>
      <p> ❗及时发布已核实可用避难所位置</p>
      <div :class="'divider'"></div>
    </div>
  </el-card>
</template>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 300px;
  height: auto;
  margin: 20px;
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