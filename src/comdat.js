import axios from 'axios'

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, params = {}) {
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
  this.$store.commit("change_data", {
    option,
    data
  })
}

/**
 * 封装timestamp方法
 * @returns a
 */

export function timestamp() {
  let a = Date.now();
  return a;
}