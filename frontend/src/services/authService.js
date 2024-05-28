import api from './api'

const authService = {
  login: async (username, password) => {
    try {
      return await api.post('login', { username, password })
    } catch (error) {
      console.error('Error logging in:', error.message)
      throw error
    }
  },

  refreshToken: async (user) => {
    try {
      return await api.post('refresh-token', user)
    } catch (error) {
      console.error('Error refreshing token:', error.message)
      throw error
    }
  }
}

export default authService
