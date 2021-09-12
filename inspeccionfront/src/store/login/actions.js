/*
export function someAction (context) {
}
*/

import {axios} from '../../boot/axios'
export function login({commit}, user) {
  return new Promise((resolve, reject) => {
    commit('auth_request')
    // axios({url: 'http://localhost:8000/axios/login', data: user, method: 'POST' })
    axios.post(process.env.API+'/login', user)
      .then(resp => {
        // console.log(resp.data)
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('tokenins', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
        commit('auth_success', {token, user})
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('tokenins')
        reject(err)
      })
  })
}
export function logout({commit}){
  return new Promise((resolve, reject) => {
    axios.post(process.env.API+'/logout').then(res=>{
      commit('salir')
      localStorage.removeItem('tokenins')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    }).catch(err => {
      commit('auth_error')
      localStorage.removeItem('tokenins')
      reject(err)
    })
  })
}
