<template>
  <div class="top">
    <div class="user_info">
      <div class="login" v-show="$store.state.is_login==false">
        <span class="login_title">还没有登录哦 ...(｡•ˇ‸ˇ•｡) ...</span>
        <Button class="login_button" @click="login()">点我登录 ~\(≥▽≤)/~</Button>
      </div>
      <div class="avatar" v-show="$store.state.is_login">
        <img :src="this.$store.state.user_info.avatar" class="avatar_img" />
      </div>
    </div>
    <div class="song_list"></div>
    <div class="song_info"></div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "top",
  methods: {
    login() {
      this.$store.commit("change_login_window", true);
    }
  }
};
</script>

<style scoped>
.top {
  width: 850px;
  height: 200px;
  /* border: solid 1px; */
  float: left;
}
.user_info,
.song_info {
  width: 250px;
  height: 200px;
  border: solid 1px;
  float: left;
}
.song_list {
  width: 350px;
  height: 200px;
  border: solid 1px;
  float: left;
}
.login {
  text-align: center;
}
.login_title {
  display: block;
  margin-top: 60px;
  font-size: 20px;
}
.login_button {
  margin-top: 30px;
}
.avatar_img {
  margin-top: 35px;
  margin-left: 10px;
  border-radius: 62.5px;
  width: 125px;
  height: 125px;
}
</style>
