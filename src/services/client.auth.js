import client from './client'

export { login, loginUsingToken, logout }

function login(user) {
  return new Promise((resolve, reject) => {
    client
      .post(`${process.env.VUE_APP_API_BASE_URL}/auth/local`, {
        identifier: user.identifier,
        password: user.password
      })
      .then(
        res => {
          const token = res.data.jwt
          commonHeaders['Authorization'] = `Bearer ${token}`
          resolve(res)
        },
        error => {
          reject(error)
        }
      )
  })
}

function loginUsingToken(token) {
  commonHeaders['Authorization'] = `Bearer ${token}`
}

function logout() {
  delete commonHeaders['Authorization']
}

const commonHeaders = client.defaults.headers.common
