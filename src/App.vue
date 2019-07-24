<template>
  <div id="app">
    <Top></Top>
    <Login v-show="$store.state.login_window"></Login>
    <Sider></Sider>
  </div>
</template>

<script>
import Sider from "./components/Sider.vue";
import Top from "./components/Top.vue";
import Login from "./components/Login.vue";

export default {
  name: "app",
  components: {
    Sider,
    Top,
    Login
  },
  mounted() {
    if (document.cookie.match("MUSIC_U") != null) {
      this.$store.commit("change_is_login", true);
    }
    var _this = this;
    this.axios
      .get("http://localhost:3000/login/status", {
        withCredentials: true
      })
      .then(function(response) {
        _this.$store.commit("change_user_info", response.data.profile);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
#app {
  width: 1200px;
  height: 700px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #eee;
  border-radius: 5px;
  margin: 40px auto;
  padding: 0;
}
</style>
