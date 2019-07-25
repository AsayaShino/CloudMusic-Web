import axios from 'axios'

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data: params,
      withCredentials: true
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装commit方法
 * @param option
 * @param data
 * @returns {Promise}
 */

export function commit(option, data) {
  return new Promise((resolve, reject) => {
    this.$store.commit("change_data", {
      option,
      data
    })
    resolve(true)
  })
}