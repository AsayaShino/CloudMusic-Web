<template>
  <div id="app">
    <User></User>
    <Login v-show="$store.state.login_window"></Login>
    <Song-List></Song-List>
    <Control></Control>
    <Lrc></Lrc>
  </div>
</template>

<script>
import User from "./components/User.vue";
import Login from "./components/Login.vue";
import SongList from "./components/SongList.vue";
import Control from "./components/Control.vue";
import Lrc from "./components/Lrc.vue";

export default {
  name: "app",
  components: {
    User,
    Login,
    SongList,
    Control,
    Lrc
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
  color: #545454;
}
</style>
