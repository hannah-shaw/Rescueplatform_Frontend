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
          主页
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/' }"
        >
          🌐 主页
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <b-field position="is-centered">
            <b-input
              v-model="searchKey"
              class="s_input"
              width="80%"
              placeholder="搜索"
              rounded
              clearable
              @keyup.enter.native="search()"
            />

            <p class="control">
              <b-button
                class="is-info"
                @click="search()"
              >🔍检索
              </b-button>
            </p>
          </b-field>
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
