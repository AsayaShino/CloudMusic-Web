<template>
  <div class="left">
    <div class="user_info">
      <div class="login" v-show="$store.state.is_login==false">
        <span class="login_title">
          还没有登录哦
          <br />...(｡•ˇ‸ˇ•｡) ...
        </span>
        <Button class="login_button" @click="login()">点我登录 ~\(≥▽≤)/~</Button>
      </div>
      <div class="avatar" v-show="$store.state.is_login">
        <img :src="this.$store.state.user_info.avatar" class="avatar_img" />
        <span class="avatar_nickname">{{$store.state.user_info.nickname}}</span>
      </div>
    </div>
    <div class="song_list"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "left",
  methods: {
    login() {
      this.$store.commit("change_data", {
        option: "login_window",
        data: true
      });
    }
  }
};
</script>

<style scoped>
.left {
  width: 200px;
  height: 700px;
  /* border: solid 1px; */
  float: left;
}
.user_info {
  width: 200px;
  height: 250px;
  border: solid 1px;
  float: left;
}
.song_list {
  width: 200px;
  height: 450px;
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
.avatar {
  text-align: center;
  margin: 0 auto;
}
.avatar_img {
  display: block;
  margin-top: 15px;
  margin-left: 35px;
  border-radius: 62.5px;
  width: 125px;
  height: 125px;
}
.avatar_nickname {
  display: block;
  margin-top: 10px;
  font-size: 25px;
}
.signin {
  margin-top: 10px;
}
</style>
