import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否登录
    is_login: false,
    // 登录窗口
    login_window: false,
    // 第一次打开获取数据，获取到显示画面，防止头像闪屏
    get_user_data: false,
    // 用户个人信息
    user_info: {
      user_id: "",
      avatar: "",
      nickname: "",
      birthday: "",
      level: ""
    }
  },
  mutations: {
    // 通用更改选项
    change_data(state, value) {
      state[value.option] = value.data;
    },
    change_login_status(state, value) {
      state.user_info.user_id = value.userId
      state.user_info.avatar = value.avatarUrl
      state.user_info.nickname = value.nickname
      state.user_info.birthday = value.birthday
    }
  },
  actions: {

  }
})
