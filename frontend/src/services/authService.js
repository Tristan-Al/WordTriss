import api from './api'

const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('login', { username, password })
      return response
    } catch (error) {
      console.error('Error logging in:', error.message)
      throw error
    }
  },
  refreshToken: async (username) => {
    try {
      const response = await api.post('auth/refresh-token', { username })
      const { token } = response
      return token
    } catch (error) {
      console.error('Error refreshing token:', error.message)
      throw error
    }
  }
}

export default authService
