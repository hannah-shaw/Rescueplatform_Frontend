<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span> 发布信息 </span>
    </div>

    <div class="has-text-centered">
      <b-button type="is-info" tag="router-link" :to="{path:'/offerhelp'}" outlined>提供帮助</b-button>
      <b-button type="is-success" tag="router-link" :to="{path:'/seekhelp'}" outlined class="ml-2">我要求助</b-button>
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