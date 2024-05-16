import api from './api'

const categoryService = {
  getAllCategories: async () => {
    try {
      return await api.get('categories')
    } catch (error) {
      console.error('Error getting all categories', error.message)
      throw error
    }
  },

  getCategoryById: async (id) => {
    try {
      return await api.get(`categories/${id}`)
    } catch (error) {
      console.error('Error getting category by id', error.message)
      throw error
    }
  },

  createCategory: async (category) => {
    try {
      return await api.post('categories', category)
    } catch (error) {
      console.error('Error creating category', error.message)
      throw error
    }
  },

  updateCategory: async (category) => {
    try {
      return await api.post('categories', category)
    } catch (error) {
      console.error('Error updating category', error.message)
      throw error
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      await api.delete(`categories/${categoryId}`)
    } catch (error) {
      console.error('Error deleting category', error.message)
      throw error
    }
  },

  getPosts: async (categoryId) => {
    try {
      return await api.get(`categories/${categoryId}/posts`)
    } catch (error) {
      console.error(
        `Error getting post of category with id: ${categoryId}`,
        error.message
      )
      throw error
    }
  }
}

export default categoryService
