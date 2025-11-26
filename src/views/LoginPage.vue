<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-dark via-primary-navy to-primary-green flex items-center justify-center px-4">
    <div class="card max-w-md w-full animate-slide-up">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary-dark mb-2">Accedi</h1>
        <p class="text-gray-600">Benvenuto! Accedi al tuo account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <div>
          <label class="label">Email</label>
          <input 
            v-model="formData.email" 
            type="email" 
            required
            class="input-field"
            placeholder="tuo@email.com"
          />
        </div>

        <div>
          <label class="label">Password</label>
          <input 
            v-model="formData.password" 
            type="password" 
            required
            class="input-field"
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
        <p class="text-gray-600">
          Non hai un account? 
          <router-link to="/register" class="text-primary-navy font-semibold hover:underline">
            Registrati
          </router-link>
        </p>
      </div>

      <div class="mt-4 text-center">
        <router-link to="/" class="text-gray-500 hover:text-gray-700">
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
