<template>
  <div>
    <div class="container context">
      <div class="box m-2">
        <helpMap></helpMap>
      </div>
    </div>
  </div>
</template>

<script>
import seekMap from "@/components/map/SeekMap";
import helpMap from "@/components/map/HelpMap";
export default {
  name: "StaPers",
  data() {
    return {};
  },
  components: {
    seekMap,
    helpMap,
  },
  methods: {},
};
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>