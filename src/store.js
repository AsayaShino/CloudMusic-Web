import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否登录
    is_login: false,
    // 登录窗口
    login_window: false,
    // 用户ID
    user_id: 0,
    // 用户个人信息
    user_info: {},
    // 歌单列表
    playlist: {},
    // 歌单信息
    playlist_info: {},
    // 音乐信息
    music: {},
    // 音乐封面
    music_info: {},
    // 是否播放
    on_play: false
  },
  mutations: {
    // 通用更改选项
    change_data(state, value) {
      state[value.option] = value.data;
    },
  },
  plugins: [vuexLocal.plugin]
})
