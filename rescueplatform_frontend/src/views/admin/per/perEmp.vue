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
      <el-col :span="24">
        <div class="chart-wrapper">
          <politics-pie />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="12">
        <div class="chart-wrapper">
          <nation-pie />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-wrapper">
          <sex-pie />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Map from "@/components/admin/echarts/Map";
import InfCard from "@/components/admin/echarts/InfCard";
import politics from "@/components/admin/echarts/Politics";
import nation from "@/components/admin/echarts/Position";
import sex from "@/components/admin/echarts/Sex";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    "single-map": Map,
    "politics-pie": politics,
    "inf-card":InfCard,
    "nation-pie":nation,
    "sex-pie":sex,
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