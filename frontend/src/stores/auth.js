import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from 'src/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(localStorage.getItem('accessToken'))
  const router = useRouter()

  const isAuthenticated = computed(() => !!accessToken.value)

  async function login(email, password) {
    const { data } = await authApi.login(email, password)
    localStorage.setItem('accessToken', data.access)
    localStorage.setItem('refreshToken', data.refresh)
    accessToken.value = data.access
    await fetchUser()
    router.push('/levels')
  }

  async function register(username, email, password) {
    await authApi.register(username, email, password)
    await login(email, password)
  }

  async function fetchUser() {
    const { data } = await authApi.getMe()
    user.value = data
  }

  function logout() {
    user.value = null
    accessToken.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    router.push('/login')
  }

  return { user, accessToken, isAuthenticated, login, register, fetchUser, logout }
})