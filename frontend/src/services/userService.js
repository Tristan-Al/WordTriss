import api from './api'

const userService = {
  getAllUsers: async () => {
    try {
      return await api.get('users')
    } catch (error) {
      console.log('Error getting users:', error.message)
      throw error
    }
  },
  getUserById: async (id) => {
    try {
      return await api.get(`users/${id}`)
    } catch (error) {
      console.log(`Error getting user by id: ${id}`)
      throw error
    }
  }
}

export default userService
