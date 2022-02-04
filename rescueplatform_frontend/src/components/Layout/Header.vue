<template>
  <header class="header has-background-white has-text-black">
    <b-navbar
      class="container is-white"
      :fixed-top="true"
    >
      <template slot="brand">
        <b-navbar-item
          class="is-hidden-desktop"
          tag="router-link"
          :to="{ path: '/' }"
        >
          应急信息平台
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/' }"
        >
          🌐 主页
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/seekmap' }"
        >
          🗺️🆘 附近求助
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/helpmap' }"
        >
          🗺️💁附近帮助
        </b-navbar-item>
      </template>

    </b-navbar>
  </header>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      searchKey: '',
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    search() {
    }
  }
}
</script>

<style scoped>
input {
  width: 80%;
  height: 86%;
}
</style>
