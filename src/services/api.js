import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 secondi di timeout
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => {
    const responseTime = performance.now()
    response._responseTime = responseTime
    console.log(`⏱️ [${response.config.url}] Risposta ricevuta dal server:`, responseTime.toFixed(2), 'ms')
    return response
  },
  (error) => {
    // Gestione errori di rete
    if (!error.response) {
      return Promise.reject(new Error('Errore di connessione. Verifica che il server backend sia avviato.'))
    }

    const status = error.response?.status
    const message = error.response?.data?.error || error.message

    if (status === 401) {
      // Token scaduto o invalido
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Solo reindirizza se non siamo già sulla pagina di login/register
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        window.location.href = '/login'
      }
    } else if (status === 404) {
      return Promise.reject(new Error('Endpoint non trovato. Verifica la configurazione dell\'API.'))
    } else if (status >= 500) {
      return Promise.reject(new Error('Errore del server. Riprova più tardi.'))
    }

    return Promise.reject(error)
  }
)

export default api
