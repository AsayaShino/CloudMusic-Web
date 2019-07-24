<template>
  <div id="app" v-show="$store.state.get_user_data">
    <Left></Left>
    <Login v-show="$store.state.login_window"></Login>
    <Right></Right>
  </div>
</template>

<script>
import Left from "./components/Left.vue";
import Login from "./components/Login.vue";
import Right from "./components/Right.vue";

export default {
  name: "app",
  components: {
    Left,
    Login,
    Right
  },
  mounted() {
    var _this = this;
    if (document.cookie.match("MUSIC_U") != null) {
      this.$store.commit("change_data", { option: "is_login", data: true });
      this.get("/login/status").then(function(res) {
        _this.$store.commit("change_login_status", res.profile);
        _this.$store.commit("change_data", {
          option: "get_user_data",
          data: true
        });
      });
    } else {
      this.$store.commit("change_data", {
        option: "get_user_data",
        data: true
      });
    }
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
