<template>
  <div class="control">
    <audio :src="this.$store.state.music.url" controls="controls" hidden id="audio"></audio>
    <div class="song">
      <img
        :src="this.$store.state.music_info.al.picUrl"
        width="40"
        style="border-radius:5px; margin-left: 10px; margin-top:8px; float:left;"
      />
      <span class="title">{{this.$store.state.music_info.name}}</span>
      <span class="archar">{{this.$store.state.music_info.ar[0].name}}</span>
      <div class="time">
        <span>{{now}}</span>
        <span>&nbsp;/&nbsp;</span>
        <span>{{time(this.$store.state.music_info.dt)}}</span>
      </div>
    </div>
    <div class="control_icon">
      <div class="play" v-show="this.$store.state.on_play == false" @click="play()">
        <Icon type="md-play" size="30" color="white" style="margin-left: 8px; margin-top: 5px;" />
      </div>
      <div class="play" v-show="this.$store.state.on_play == true" @click="pause()">
        <Icon type="md-pause" size="30" color="white" style="margin-left: 5.5px; margin-top: 5px;" />
      </div>
    </div>
    <Progress :percent="percent" class="progress" />
  </div>
</template>

<script>
export default {
  name: "control",
  data() {
    return {
      now: "0:00",
      percent: 0
    };
  },
  methods: {
    play() {
      var audio = document.getElementById("audio");
      audio.play();
      this.commit("on_play", true);
      return true;
    },
    pause() {
      var audio = document.getElementById("audio");
      audio.pause();
      this.commit("on_play", false);
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
    }
  },
  mounted() {
    var time = document.querySelector("#audio");
    var _this = this;
    time.addEventListener("timeupdate", function() {
      var times = time.currentTime;
      _this.now = _this.time(parseInt(times * 1000));
      _this.percent = parseInt(
        ((times * 1000) / _this.$store.state.music_info.dt) * 100
      );
    });
  },
  watch: {
    "$store.state.music": function() {
      this.$nextTick(() => {
        var audio = document.getElementById("audio");
        audio.play();
      });
    }
  }
};
</script>

<style scoped>
.control {
  width: 650px;
  height: 75px;
  /* border: solid 1px; */
  float: left;
}
.song {
  width: 350px;
  height: 60px;
  /* border: solid 1px; */
  float: left;
}
.control_icon {
  width: 300px;
  height: 60px;
  /* border: solid 1px; */
  float: left;
}
.play {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: tomato;
  margin-top: 10px;
}
.title {
  width: 280px;
  margin-top: 6px;
  margin-left: 15px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
.archar {
  width: 280px;
  margin-top: -3px;
  margin-left: 15px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
.time {
  float: left;
  margin-top: -3px;
  margin-left: 15px;
}
.progress {
  float: left;
  margin-top: -8px;
  margin-left: 10px;
}
</style>
