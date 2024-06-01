import api from './api'

const tagService = {
  getAllTags: async (options = {}) => {
    try {
      const queryParams = new URLSearchParams({
        ...defaultQueryParams,
        ...options
      })

      return await api.get(`tags?${queryParams.toString()}`)
    } catch (error) {
      console.error('Error getting all tags', error.message)
      throw error
    }
  },
  getTagById: async (id) => {
    try {
      return await api.get(`tags/${id}`)
    } catch (error) {
      console.error('Error getting tag by id: ', error.message)
      throw error
    }
  },

  createTag: async (tag) => {
    try {
      return await api.post('tags', tag)
    } catch (error) {
      console.error('Error creating tag', error.message)
      throw error
    }
  },

  updateTag: async (tag) => {
    try {
      return await api.post('tags', tag)
    } catch (error) {
      console.error('Error updating tag', error.message)
      throw error
    }
  },

  deleteTag: async (id) => {
    try {
      return await api.delete(`tags/${id}`)
    } catch (error) {
      console.error('Error deleting tag', error.message)
      throw error
    }
  },

  getPosts: async (tagId, options = {}) => {
    try {
      const queryParams = new URLSearchParams({
        ...defaultQueryParams,
        ...options
      })

      return await api.get(`tags/${tagId}/posts?${queryParams.toString()}`)
    } catch (error) {
      console.error(
        `Error getting posts of tag with tagId ${tagId}`,
        error.message
      )
      throw error
    }
  }
}

export default tagService
