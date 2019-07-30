<template>
  <div class="song_list">
    <div class="list_info">
      <img :src="this.$store.state.playlist_info.coverImgUrl" width="150" style="float: left;" />
      <div class="list_info_desc">
        <div class="name">{{this.$store.state.playlist_info.name}}</div>
        <div style="margin-top: 10px;  margin-left: 25px; width: 450px; height: 30px;">
          <img
            :src="this.$store.state.playlist_info.creator.avatarUrl"
            width="20"
            style="border-radius: 10px; display: block; float: left;"
          />
          <span
            style="margin-left: 5px; margin-top: 2px; display: block; float: left;"
          >{{this.$store.state.playlist_info.creator.nickname}}</span>
          <span
            style="margin-left: 15px; margin-top: 2px; display: block; float: left;"
          >创建于：{{transformTime(this.$store.state.playlist_info.createTime)}}</span>
        </div>
        <div style="margin-left: 25px;">
          <span>标签：</span>
          <span
            v-for="(item, index) in this.$store.state.playlist_info.tags"
            :key="index"
          >{{tag(item, index)}}</span>
          <span v-show="this.$store.state.playlist_info.tags.length == 0">无</span>
        </div>
        <div style="margin-left: 25px; margin-top: 3px;">
          <span>歌曲数：{{this.$store.state.playlist_info.trackCount}}</span>
          <span style="margin-left: 15px;">播放数：{{this.$store.state.playlist_info.playCount}}</span>
        </div>
        <div style="margin-left: 25px; margin-top: 3px;">
          <span
            class="desc"
            v-show="this.$store.state.playlist_info.description != null"
          >简介：{{this.$store.state.playlist_info.description}}</span>
          <span class="desc" v-show="this.$store.state.playlist_info.description == null">简介：无</span>
        </div>
      </div>
    </div>
    <div class="song_info">
      <div class="nav">
        <div style="margin-left: 45px; margin-top: 6px; float: left;">音乐标题</div>
        <div style="margin-left: 310px; margin-top: 6px; float: left;">歌手</div>
        <div style="margin-left: 140px; margin-top: 6px; float: left;">时长</div>
      </div>
      <div class="song_list1">
        <div
          class="song"
          v-for="(item, index) in this.$store.state.playlist_info.tracks"
          :key="index"
          @click="song(item.id)"
        >
          <div style="margin-left:15px; float:left; width: 15px;">{{index+1}}</div>
          <div class="song_name" style="margin-left: 15px; float:left;">
            <span>{{item.name}}</span>
            <span
              style="margin-left: 5px; color: gray;"
              v-show="item.alia.length != 0"
            >({{item.alia[0]}})</span>
          </div>
          <div class="song_archer">{{archar(item.ar)}}</div>
          <div class="song_time">{{time(item.dt)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "song_list",
  methods: {
    transformTime(timestamp = +new Date()) {
      if (timestamp) {
        var time = new Date(timestamp);
        var y = time.getFullYear();
        var M = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();
        return (
          y +
          "-" +
          this.addZero(M) +
          "-" +
          this.addZero(d) +
          " " +
          this.addZero(h) +
          ":" +
          this.addZero(m) +
          ":" +
          this.addZero(s)
        );
      } else {
        return "";
      }
    },
    addZero(m) {
      return m < 10 ? "0" + m : m;
    },
    tag(item, index) {
      let length = this.$store.state.playlist_info.tags.length;
      if (index + 1 < length) {
        item = item + "、";
      }
      return item;
    },
    time(time) {
      time = parseInt(time / 1000);
      let min = parseInt(time / 60);
      let sec = time % 60;
      if (sec < 10) {
        sec = "0" + sec;
      }
      time = min + ":" + sec;
      return time;
    },
    archar(item) {
      var item2 = "";
      for (let i = 0; i < item.length; i++) {
        if (i < item.length - 1) {
          item2 = item2 + item[i].name + "、";
        } else {
          item2 = item2 + item[i].name;
        }
      }
      return item2;
    },
    song(item) {
      var _this = this;
      this.post("/song/url", {
        id: item
      }).then(function(res) {
        _this.commit("music", res.data[0]);
        _this.now_lrc = 0;
      });
      this.post("/song/detail?ids=" + item, {}).then(function(res) {
        _this.commit("music_info", res.songs[0]);
      });
    }
  }
};
</script>

<style scoped>
.song_list {
  float: left;
  width: 650px;
  height: 625px;
  border-right: 1px solid #e8eaec;
  border-bottom: 1px solid #e8eaec;
}
.list_info {
  width: 650px;
  height: 150px;
  border-bottom: 1px solid #e8eaec;
}
.list_info:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.list_info_desc {
  width: 500px;
  height: 150px;
  float: left;
}
.name {
  font-size: 18px;
  margin-left: 25px;
  margin-top: 15px;
}
.desc {
  display: inline-block;
  white-space: nowrap;
  width: 460px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song_info {
  width: 650px;
  height: 475px;
  overflow: scroll;
  overflow-x: hidden;
}
.nav {
  width: 635px;
  height: 40px;
  font-size: 16px;
  border-bottom: 1px solid #e8eaec;
  position: fixed;
  background: #ffffff;
}
.song_list1 {
  width: 650px;
  height: 435px;
}
.song {
  width: 650px;
  height: 30px;
  line-height: 25px;
}
.song:nth-child(2n) {
  background: #fafafa;
}
.song:first-child {
  margin-top: 40px;
}
.song:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
  color: tomato;
}
.song_name {
  width: 365px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
.song_archer {
  width: 160px;
  margin-left: 12px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
.song_time {
  width: 50px;
  margin-left: 10px;
  float: left;
}
</style>
