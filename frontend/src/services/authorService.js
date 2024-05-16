import api from './api.js'

const authorService = {
  getAllAuthors: async () => {
    try {
      return await api.get('authors')
    } catch (error) {
      console.error('Error getting all authors', error.message)
      throw error
    }
  },

  getAuthorById: async (id) => {
    try {
      return await api.get(`authors/${id}`)
    } catch (error) {
      console.error(`Error getting authors by id: ${id}. `, error.message)
      throw error
    }
  },

  createAuthor: async (author) => {
    try {
    } catch (error) {
      console.error('Error creating author', error.message)
      throw error
    }
  },

  // ...

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
  }
}

export default authorService
