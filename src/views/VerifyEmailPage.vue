<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Verifica Email</h1>
        <p class="text-gray-600 mb-6">
          Inserisci il codice a 6 cifre che abbiamo inviato alla tua email
        </p>
        
        <form @submit.prevent="verifyCode" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="la-tua-email@example.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="code" class="block text-sm font-medium text-gray-700 mb-2">
              Codice di verifica (6 cifre)
            </label>
            <input
              id="code"
              v-model="formData.code"
              type="text"
              required
              maxlength="6"
              pattern="[0-9]{6}"
              placeholder="000000"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
              @input="formatCode"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {{ loading ? 'Verifica in corso...' : 'Verifica Codice' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <button
            @click="resendCode"
            :disabled="resendLoading || resendCooldown > 0"
            class="text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ resendCooldown > 0 ? `Reinvia codice (${resendCooldown}s)` : 'Non hai ricevuto il codice? Reinvia' }}
          </button>
        </div>

        <div v-if="responseMessage" :class="[
          'mt-6 p-4 rounded-lg text-center font-medium',
          responseType === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        ]">
          {{ responseMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const route = useRoute()

const formData = ref({
  email: '',
  code: ''
})

const loading = ref(false)
const resendLoading = ref(false)
const responseMessage = ref('')
const responseType = ref('')
const resendCooldown = ref(0)

onMounted(() => {
  // Pre-fill email from route query if available
  if (route.query.email) {
    formData.value.email = route.query.email
  }
})

const formatCode = (event) => {
  // Only allow numbers
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 6) {
    value = value.slice(0, 6)
  }
  formData.value.code = value
  event.target.value = value
}

const verifyCode = async () => {
  loading.value = true
  responseMessage.value = ''
  responseType.value = ''

  try {
    const response = await api.post('/verify-code', {
      email: formData.value.email,
      code: formData.value.code
    })

    responseMessage.value = 'Email verificata con successo! Ora puoi accedere.'
    responseType.value = 'success'
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    responseMessage.value = error.response?.data?.error || error.message || 'Errore durante la verifica del codice'
    responseType.value = 'error'
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  if (!formData.value.email) {
    responseMessage.value = 'Inserisci prima la tua email'
    responseType.value = 'error'
    return
  }

  resendLoading.value = true
  responseMessage.value = ''
  responseType.value = ''

  try {
    await api.post('/resend-code', {
      email: formData.value.email
    })

    responseMessage.value = 'Codice di verifica inviato! Controlla la tua email.'
    responseType.value = 'success'
    
    // Start cooldown timer (60 seconds)
    resendCooldown.value = 60
    const interval = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(interval)
      }
    }, 1000)
  } catch (error) {
    responseMessage.value = error.response?.data?.error || error.message || 'Errore durante l\'invio del codice'
    responseType.value = 'error'
  } finally {
    resendLoading.value = false
  }
}
</script>

