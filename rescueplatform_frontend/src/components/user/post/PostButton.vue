<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span> 发布信息 </span>
    </div>

    <div class="has-text-centered">
      <b-button type="is-primary" tag="router-link" :to="{path:'/'}" outlined>提供帮助</b-button>
      <b-button type="is-danger" tag="router-link" :to="{path:'/seekhelp'}" outlined class="ml-2">我要求助</b-button>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'PostButton',
}
</script>

<style scoped>

</style>