<template>
  <div class="lrc">
    <div id="abc" style="margin-top: 200px;">
      <div
        v-for="(item, index) in lrcs"
        :key="index"
        class="span-lrc"
        :class="[index == now_lrc -1 ? 'light':'']"
      >
        {{item}}
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lrc",
  data() {
    return {
      time: [],
      lrcs: [],
      now_lrc: 0
    };
  },
  methods: {
    lrc() {
      var time = [];
      var lrc = [];
      var lrcs = this.$store.state.lrc.split("\n");
      lrcs.splice(lrcs.length - 1, 1);
      for (let i = 0; i < lrcs.length; i++) {
        let lrcs1 = lrcs[i].split("[");
        lrcs1 = lrcs1[1].split("]");
        let lrcs2 = lrcs1[0].split(":");
        lrcs2 = parseInt(lrcs2[0]) * 60 + parseInt(lrcs2[1]);
        time.push(lrcs2);
        lrc.push(lrcs1[1]);
      }
      this.lrcs = lrc;
      this.time = time;
    },
    scroll() {
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      var abc = document.getElementById("abc").style.marginTop;
      abc = abc.split("px")[0];
      abc = abc - 20;
      document.getElementById("abc").style.marginTop = abc + "px";
      console.log(abc);
    }
  },
  watch: {
    "$store.state.music": function() {
      var _this = this;
      this.post("/lyric", {
        id: _this.$store.state.music.id
      }).then(function(res) {
        _this.commit("time", 0);
        _this.commit("lrc", res.lrc.lyric);
        _this.lrc();
        _this.now_lrc = 0;
      });
    },
    "$store.state.time": function() {
      this.$nextTick(() => {
        var i = this.now_lrc;
        if (this.$store.state.time >= this.time[i]) {
          this.now_lrc = i + 1;
          this.scroll();
        }
      });
    }
  }
};
</script>

<style scoped>
.lrc {
  width: 350px;
  height: 700px;
  /* border: solid 1px; */
  float: left;
  margin-top: -625px;
  text-align: center;
  overflow: hidden;
  font-size: 14px;
}
.lrc:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.span-lrc {
  width: 350px;
}
.light {
  font-size: 20px;
}
</style>
