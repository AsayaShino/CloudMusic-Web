<template>
  <div class="user">
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
        <img
          src="@/assets/icon/yinle.png"
          width="18"
          style="position: relative; left: -4px; top: 1px;"
        />
        <span style="position: relative; left: 0px; top: -2px;">歌单列表</span>
      </div>
      <div class="list">
        <div
          class="song_list_card"
          v-for="(item, index) in this.$store.state.playlist"
          v-show="11 * (page - 1) <= index && index < 11 * page"
          :key="index"
          @click="change_list(item)"
        >
          <img
            src="@/assets/icon/liebiao.png"
            width="18"
            style="position: relative; left: -5px; top: 8px; float: left;"
          />
          <span class="list_name">{{item.name}}</span>
        </div>
      </div>
      <div class="page">
        <img
          src="@/assets/icon/paging_left.png"
          width="15"
          style="float: left; display:block; margin-left: 15px; margin-top: 4px;"
          @click="change_page_icon('left')"
        />
        <div class="page_number">
          <span
            class="number"
            v-for="(item, index) in pageCount"
            :key="index"
            @click="change_page(item)"
          >{{item}}</span>
        </div>
        <img
          src="@/assets/icon/paging_right.png"
          width="15"
          style="float: right; display:block; margin-right: 15px; margin-top: 4px;"
          @click="change_page_icon('right')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      page: 1,
      pageCount: 1
    };
  },
  methods: {
    login() {
      this.$store.commit("change_data", {
        option: "login_window",
        data: true
      });
    },
    change_page(item) {
      this.page = item;
    },
    change_page_icon(value) {
      if (value == "left") {
        if (this.page - 1 > 0) {
          this.page = this.page - 1;
        }
      } else {
        if (this.page + 1 <= this.pageCount) {
          this.page = this.page + 1;
        }
      }
    },
    change_list(item) {
      var _this = this;
      this.post("/playlist/detail", {
        id: item.id
      }).then(function(res) {
        _this.commit("playlist_info", res.playlist);
      });
    }
  },
  mounted() {
    var _this = this;
    if (this.$store.state.is_login) {
      // 获取用户状态
      this.post("/login/status").then(function(res) {
        _this.commit("user_info", res.profile);
      });
      // 获取用户歌单
      this.post("/user/playlist", {
        uid: _this.$store.state.user_info.userId
      }).then(function(res) {
        _this.commit("playlist", res.playlist);
        let length = _this.$store.state.playlist.length;
        _this.pageCount = Math.ceil(length / 11);
      });
    }
  }
};
</script>

<style scoped>
.user {
  width: 200px;
  height: 700px;
  border-right: 1px solid #e8eaec;
  float: left;
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
  height: 385px;
  overflow: hidden;
  /* border: solid 1px; */
}
.song_list {
  user-select: none;
  height: 450px;
}
.song_list_card {
  width: 200px;
  height: 35px;
  font-size: 14px;
  padding-left: 15px;
  border-bottom: 1px solid #e8eaec;
}
.song_list_card:first-child {
  border-top: 1px solid #e8eaec;
}
.song_list_card:last-child {
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
.page img:hover {
  cursor: pointer;
}
.page_number {
  float: left;
  width: 140px;
  text-align: center;
}
.number {
  font-size: 14px;
  margin-left: 3px;
  margin-right: 3px;
}
.number:hover {
  cursor: pointer;
  color: lightcoral;
}
</style>
