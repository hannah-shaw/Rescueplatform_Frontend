<template>
  <div class="mt-5">
    <el-row :gutter="30">
      <el-col :span="12">
        <div class="chart-wrapper">
          <single-map />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-wrapper">
          <single-pie />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Map from "@/components/admin/echarts/Map";
import Pie from "@/components/admin/echarts/HelpPie";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    "single-map": Map,
    "single-pie": Pie,
  },
};
</script>

<style scoped>
.china-map {
  width: 45%;
}
.china-pie {
  width: 45%;
}
.chart-wrapper {
  background: #fff;
  padding: 6px 6px 0;
  margin-bottom: 32px;
}
</style>