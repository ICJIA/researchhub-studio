import { apiBaseURL } from '@/config'
import client from './client'

export { login, loginUsingToken, logout }

/**
 * Log in with id and password.
 * @param {String} identifier
 * @param {String} password
 */
const login = ({ identifier, password }) =>
  new Promise((resolve, reject) => {
    client
      .post(`${apiBaseURL}/auth/local`, {
        identifier,
        password
      })
      .then(
        res => {
          loginUsingToken(res.data.jwt)
          resolve(res)
        },
        error => reject(error)
      )
  })

/**
 * Log in by using JWT for authorization.
 * @param {String} token
 */
const loginUsingToken = token =>
  (client.defaults.headers.common['Authorization'] = `Bearer ${token}`)

/**
 * Log out by removing authorization.
 */
const logout = () => delete client.defaults.headers.common['Authorization']
