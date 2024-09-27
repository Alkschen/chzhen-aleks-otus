import { jwtDecode } from 'jwt-decode'

export const decodeToken = (token) => {
  if (!token) {
    return null
  }
  try {
    return jwtDecode(token, { payload: true })
  } catch (error) {
    return null
  }
}

export const getCurrentUser = () => {
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
  return decodeToken(token)
}
