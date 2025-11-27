<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-dark flex items-center justify-center px-4">
    <div class="bg-neutral-800/90 backdrop-blur-sm border border-neutral-700 rounded-xl shadow-2xl max-w-md w-full animate-slide-up p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Accedi</h1>
        <p class="text-neutral-300">Benvenuto! Accedi al tuo account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div v-if="error" class="bg-error/20 border border-error/50 text-error-light px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">Email</label>
          <input 
            v-model="formData.email" 
            type="email" 
            required
            class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white placeholder-neutral-400"
            placeholder="tuo@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">Password</label>
          <input 
            v-model="formData.password" 
            type="password" 
            required
            class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white placeholder-neutral-400"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          class="btn-primary w-full"
          :disabled="loading"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <div class="spinner mr-2"></div>
            Accesso in corso...
          </span>
          <span v-else>Accedi</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-neutral-300">
          Non hai un account? 
          <router-link to="/register" class="text-accent-blue-light font-semibold hover:text-accent-blue transition-colors">
            Registrati
          </router-link>
        </p>
      </div>

      <div class="mt-4 text-center">
        <router-link to="/" class="text-neutral-400 hover:text-neutral-200 transition-colors">
          ← Torna alla home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null

  try {
    await authStore.login(formData.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Errore durante l\'accesso'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
