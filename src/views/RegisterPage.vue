<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
    <div class="card max-w-md w-full animate-slide-up">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary-dark mb-2">Registrati</h1>
        <p class="text-neutral-600">Crea il tuo account gratuito</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div v-if="error" class="bg-error-light/10 border border-error-light text-error-dark px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <div>
          <label class="label">Nome</label>
          <input 
            v-model="formData.name" 
            type="text" 
            required
            class="input-field"
            placeholder="Il tuo nome"
          />
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
            minlength="6"
            class="input-field"
            placeholder="••••••••"
          />
          <p class="text-xs text-neutral-500 mt-1">Minimo 6 caratteri</p>
        </div>

        <div>
          <label class="label">Conferma Password</label>
          <input 
            v-model="formData.confirmPassword" 
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
            Registrazione in corso...
          </span>
          <span v-else>Registrati</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-neutral-600">
          Hai già un account? 
          <router-link to="/login" class="text-accent-blue font-semibold hover:text-accent-blue-dark hover:underline">
            Accedi
          </router-link>
        </p>
      </div>

      <div class="mt-4 text-center">
        <router-link to="/" class="text-neutral-500 hover:text-neutral-700 transition-colors">
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
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref(null)

const handleRegister = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Le password non corrispondono'
    return
  }

  loading.value = true
  error.value = null

  try {
    await authStore.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    })
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Errore durante la registrazione'
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
