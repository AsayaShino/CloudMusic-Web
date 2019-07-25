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
    // 判断cookie是否登录
    if (document.cookie.match("MUSIC_U") != null) {
      (async function() {
        await _this.commit("is_login", true);
        await get_login_status();
        await get_user_playlist();
        await _this.commit("get_user_data", true);
      })();
    } else {
      this.commit("get_user_data", true);
    }
    // 获取用户状态
    function get_login_status() {
      return new Promise((resolve, reject) => {
        _this.get("/login/status").then(function(res) {
          _this.commit("user_info", res.profile);
          resolve(true);
        });
      });
    }
    // 获取用户歌单
    function get_user_playlist() {
      return new Promise((resolve, reject) => {
        _this
          .get("/user/playlist", {
            uid: _this.$store.state.user_info.userId
          })
          .then(function(res) {
            _this.commit("playlist", res.playlist);
            resolve(true);
          });
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
  border-radius: 5px;
  margin: 40px auto;
  padding: 0;
  font-weight: bold;
}
</style>
