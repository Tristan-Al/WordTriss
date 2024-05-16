import api from './api'

const authService = {
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
