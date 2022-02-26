<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="部门管理" name="DepMana"><DepMana /></el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana"><PosMana /></el-tab-pane>
      <el-tab-pane label="职称管理" name="JoblebelMana"
        ><JoblebelMana
      /></el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcMana"><EcMana /></el-tab-pane>
      <el-tab-pane label="权限管理" name="PermissMana"
        ><PermissMana
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepMana from "../../../components/sys/basic/DepMana.vue";
import EcMana from "../../../components/sys/basic/EcMana.vue";
import JoblebelMana from "../../../components/sys/basic/JoblebelMana.vue";
import PermissMana from "../../../components/sys/basic/PermissMana.vue";
import PosMana from "../../../components/sys/basic/PosMana.vue";
export default {
  name: "SysBasic",
  data() {
    return {
      activeName: "DepMana",
    };
  },
  components: { DepMana, EcMana, JoblebelMana, PermissMana, PosMana },
};
</script>

<style>
</style>