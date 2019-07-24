import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_login: false,
    login_window: false,
    user_info: {
      user_id: "",
      avatar: "",
      nickname: "",
      birthday: ""
    }
  },
  mutations: {
    change_login_window(state, value) {
      state.login_window = value;
    },
    change_is_login(state, value) {
      state.is_login = value;
    },
    change_user_info(state, value) {
      state.user_info.user_id = value.userId
      state.user_info.avatar = value.avatarUrl
      state.user_info.nickname = value.nickname
      state.user_info.birthday = value.birthday
    }
  },
  actions: {

  }
})
