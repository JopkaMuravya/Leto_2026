import api from './index'

export const resultsApi = {
  save(data) {
    return api.post('/results/', data)
  },
  getMy() {
    return api.get('/results/')
  },
  getLeaderboard() {
    return api.get('/results/leaderboard/')
  },
}