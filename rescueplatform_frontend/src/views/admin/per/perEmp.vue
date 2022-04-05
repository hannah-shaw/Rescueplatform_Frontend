<template>
  <div class="mt-5">
    <el-row :gutter="30">
      <el-col :span="16">
        <div class="chart-wrapper">
          <single-map />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <inf-card/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="12">
        <div class="chart-wrapper">
          <single-hpie />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-wrapper">
          <single-shpie />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Map from "@/components/admin/echarts/Map";
import InfCard from "@/components/admin/echarts/InfCard";
import hPie from "@/components/admin/echarts/HelpPie";
import shPie from "@/components/admin/echarts/SeekHelpPie";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    "single-map": Map,
    "single-hpie": hPie,
    "single-shpie": shPie,
    "inf-card":InfCard,
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