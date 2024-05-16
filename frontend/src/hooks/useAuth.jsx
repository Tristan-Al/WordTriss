import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
  // Get the cookie from the browser
  const cookie = Cookies.get('_auth')
  // console.log(`useAuth`)

  let userId = null
  let displayName = null
  let username = null
  let email = null
  let picture = null
  let roleId = null
  let isAdmin = null
  let token = null

  if (cookie) {
    // console.log('There are data in cookies: ' + cookie)
    // Decode token
    const decoded = jwtDecode(cookie)

    // console.log(`Cookie decoded`)
    // console.log(decoded)

    // Check if token is expired
    const isExpired = decoded?.exp < Date.now() / 1000

    if (isExpired) {
      // If it's expired remove cookie
      Cookies.remove('_auth')
    } else {
      // If not get it's data
      userId = decoded.user.id
      displayName = decoded.user.displayName
      username = decoded.user.username
      email = decoded.user.email
      picture = decoded.user.picture
      roleId = decoded.user.roleId
      isAdmin = roleId === 1
      token = cookie
    }
  }

  return {
    userId,
    displayName,
    username,
    email,
    picture,
    roleId,
    isAdmin,
    token
  }
}

export default useAuth
