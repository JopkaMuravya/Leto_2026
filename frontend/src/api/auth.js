import api from './index'

export const authApi = {
  login(email, password) {
    return api.post('/auth/login/', { email, password })
  },
  register(username, email, password) {
    return api.post('/auth/register/', { username, email, password })
  },
  getMe() {
    return api.get('/users/me/')
  },
}