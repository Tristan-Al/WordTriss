import api from './api'

const tagService = {
  getAllTags: async () => {
    try {
      return await api.get('tags')
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

  getPosts: async (id) => {
    try {
      return await api.get(`tags/${id}/posts`)
    } catch (error) {
      console.error(`Error getting posts of tag with id ${id}`, error.message)
      throw error
    }
  }
}

export default tagService
