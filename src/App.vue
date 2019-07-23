<template>
  <div id="app">
    <Sider></Sider>
  </div>
</template>

<script>
import Sider from "./components/Sider.vue";

export default {
  name: "app",
  components: {
    Sider
  }
};
</script>

<style scoped>
#app {
  width: 1200px;
  height: 700px;
  border: solid 1px;
  margin: 40px auto;
  padding: 0;
}
</style>
