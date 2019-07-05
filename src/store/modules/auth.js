import { login, loginUsingToken, logout } from '@/services/client.auth.js'

export { namespaced, state, mutations, actions }

const namespaced = true

const state = {
  isLoggedIn: false,
  role: ''
}

const mutations = {
  LOGIN(state) {
    state.isLoggedIn = true
    state.role = sessionStorage.getItem('role')
  },
  LOGOUT(state) {
    state.isLoggedIn = false
    state.role = ''
    logout()
  }
}

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user).then(
        res => {
          sessionStorage.setItem('token', res.data.jwt)
          sessionStorage.setItem('role', res.data.user.role.name)
          commit('LOGIN')
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  loginUsingToken({ commit }) {
    loginUsingToken(sessionStorage.token)
    commit('LOGIN')
  },
  logout({ commit }) {
    sessionStorage.clear()
    commit('LOGOUT')
  }
}
