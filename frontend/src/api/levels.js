import api from './index'

export const levelsApi = {
  getAll() {
    return api.get('/levels/')
  },
  getById(id) {
    return api.get(`/levels/${id}/`)
  },
}