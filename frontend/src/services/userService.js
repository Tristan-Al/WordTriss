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
  },

  getPosts: async (id) => {
    try {
      return await api.get(`users/${id}/posts`)
    } catch (error) {
      console.error(
        `Error getting posts of the author with id: ${id}. `,
        error.message
      )
      throw error
    }
  },

  updateUser: async (user, curUserId, curUserRoleName) => {
    try {
      // Check if the user is an admin or the user is not updating itself
      if (curUserId !== user.id && curUserRoleName !== 'ADMIN') {
        return {
          ok: false,
          message: 'You are not authorized to update this user'
        }
      }

      //Check if any necessary field is empty
      if (!user.displayName || !user.username || !user.email) {
        return {
          ok: false,
          message: 'Necessary fields are required'
        }
      }

      // Check if the user is updating password
      if (user.password !== '') {
        // Check if confirm password is empty
        if (user.confirmPassword === '') {
          return {
            ok: false,
            message: 'Confirm password is required'
          }
        }
        // Check if the password and confirm password match
        if (user.password !== user.confirmPassword) {
          return {
            ok: false,
            message: 'Passwords do not match'
          }
        }
      }

      // Create updateUser object with only defined properties
      const updateUser = {
        ...Object.fromEntries(
          Object.entries(user).map(([key, value]) => [key, value])
        )
      }

      console.log('Request to api Update user:', updateUser)
      // Make the request to the api
      return await api.put(`users/${user.id}`, updateUser)
    } catch (error) {
      console.error('Error updating user:', error.message)
      throw error
    }
  }
}

export default userService
