import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
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
    
    // Log per verificare cache delle richieste
    console.log('📤 Richiesta API:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      timestamp: new Date().toISOString(),
      cache: config.headers['Cache-Control'] || 'default'
    })
    
    // Disabilita cache per le richieste GET durante sviluppo
    if (config.method === 'get') {
      config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
      config.headers['Pragma'] = 'no-cache'
      config.headers['Expires'] = '0'
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
    // Log per verificare cache delle risposte
    console.log('📥 Risposta API:', {
      url: response.config.url,
      status: response.status,
      timestamp: new Date().toISOString(),
      fromCache: response.headers['x-cache'] || 'unknown',
      etag: response.headers['etag'] || 'none'
    })
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
