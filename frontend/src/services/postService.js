import api from './api'

const postService = {
  getAllPosts: async () => {
    try {
      return await api.get('posts')
    } catch (error) {
      console.log('Error getting posts:', error.message)
      throw error
    }
  },

  getPostById: async (id) => {
    try {
      return await api.get(`posts/${id}`)
    } catch (error) {
      console.log('Error getting posts :', error.message)
      throw error
    }
  },

  createPost: async (post) => {
    try {
      return await api.post('posts', post)
    } catch (error) {
      console.error('Error creating post:', error.message)
      throw error
    }
  },

  updatePost: async (post) => {
    try {
      return await api.post('posts', post)
    } catch (error) {
      console.error('Error updating post:', error.message)
      throw error
    }
  },

  deletePost: async (postId) => {
    try {
      await api.delete(`posts/${postId}`)
    } catch (error) {
      console.error('Error deleting post:', error.message)
      throw error
    }
  }
}

export default postService
