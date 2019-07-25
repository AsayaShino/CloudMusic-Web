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
        <img :src="this.$store.state.user_info.avatarUrl" class="avatar_img" />
        <span class="avatar_nickname">{{$store.state.user_info.nickname}}</span>
      </div>
    </div>
    <div class="song_list">
      <div class="create_list">
        <img src="@/assets/yinle.png" width="18" style="position: relative; left: -4px; top: 1px;" />
        <span style="position: relative; left: 0px; top: -2px;">歌单列表</span>
      </div>
      <div class="list">
        <div
          class="song_list_card"
          v-for="(item, index) in this.$store.state.playlist"
          :key="index"
        >
          <img
            src="@/assets/liebiao.png"
            width="18"
            style="position: relative; left: -5px; top: 8px; float: left;"
          />
          <span class="list_name">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  border-right: 1px solid #e8eaec;
  float: left;
  overflow: hidden;
}
.user_info {
  width: 200px;
  height: 250px;
  border-bottom: 1px solid #e8eaec;
  float: left;
}
.user_info:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.song_list {
  width: 200px;
  height: 450px;
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
.create_list {
  width: 200px;
  height: 20px;
  font-size: 16px;
  padding-left: 15px;
  margin-top: 10px;
}
.list {
  margin-top: 10px;
  width: 200px;
  height: 425px;
  overflow: scroll;
}
.song_list {
  user-select: none;
}
.song_list_card {
  width: 185px;
  height: 35px;
  font-size: 14px;
  padding-left: 15px;
  border-bottom: 1px solid #e8eaec;
}
.song_list_card:nth-child(1) {
  border-top: 1px solid #e8eaec;
}
.song_list:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.song_list_card:hover {
  cursor: pointer;
  color: tomato;
}
.list_name {
  position: relative;
  top: 6px;
  display: block;
  float: left;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
</style>
