// import useAuth from '../hooks/useAuth'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

const api = {
  handleResponse: async (response) => {
    const data = await response.json()

    if (!response.ok) {
      console.log(data)
      throw new Error(data.message || 'API returned an error')
    }

    return data
  },

  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`)
      return api.handleResponse(response)
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  // post: async (endpoint, body) => {
  //   const { token } = useAuth()
  //   try {
  //     const response = await fetch(`${BASE_URL}/${endpoint}`, {
  //       method: 'POST',
  //       // Pass the token in the Authorization header
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token // Add token in header
  //       },
  //       body: JSON.stringify(body)
  //     })
  //     return api.handleResponse(response)
  //   } catch (error) {
  //     console.error('Error posting data:', error)
  //     throw error
  //   }
  // },
  //
  // delete: async (endpoint) => {
  //   const { token } = useAuth()
  //   try {
  //     const response = await fetch(`${BASE_URL}/${endpoint}`, {
  //       method: 'DELETE',
  //       // Pass the token in the Authorization header
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token // Add token in header
  //       }
  //     })
  //     return api.handleResponse(response)
  //   } catch (error) {
  //     console.error('Error deleting data:', error)
  //     throw error
  //   }
  // },
  //
  // put: async (endpoint, body) => {
  //   const { token } = useAuth()
  //   try {
  //     const response = await fetch(`${BASE_URL}/${endpoint}`, {
  //       method: 'PUT',
  //       // Pass the token in the Authorization header
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token // Add token in header
  //       },
  //       body: JSON.stringify(body)
  //     })
  //     return api.handleResponse(response)
  //   } catch (error) {
  //     console.error('Error updating data:', error)
  //     throw error
  //   }
  // }
}

export default api