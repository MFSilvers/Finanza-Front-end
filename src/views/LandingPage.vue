<template>
  <div class="landing-page">
    <!-- Header -->
    <header 
      class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
      :class="headerScrolled ? 'bg-white/98 shadow-md border-b border-gray-200' : 'bg-white/95 shadow-sm border-b border-gray-200/50'"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-navy to-primary-green flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div class="text-xl font-bold text-primary-dark">Finanze</div>
              <div class="text-xs text-gray-500 font-medium">Gestione Finanziaria</div>
            </div>
          </router-link>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-gray-700 hover:text-primary-navy transition-colors font-medium">
              Funzionalità
            </a>
            <a href="#demo" class="text-gray-700 hover:text-primary-navy transition-colors font-medium">
              Demo
            </a>
          </nav>

          <!-- Auth Buttons -->
          <div class="flex items-center gap-4">
            <router-link to="/login" class="text-gray-700 hover:text-primary-navy transition-colors font-medium hidden sm:block">
              Accedi
            </router-link>
            <router-link to="/register" class="btn-primary px-6 py-2.5 text-sm">
              Inizia Gratis
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero bg-gradient-to-br from-primary-dark via-primary-navy to-primary-green text-white min-h-screen flex items-center relative overflow-hidden pt-20">
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center animate-fade-in max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-slide-down leading-tight">
            Gestisci le Tue Finanze<br />con Semplicità
          </h1>
          <p class="text-xl md:text-2xl mb-10 text-gray-200 animate-slide-up font-light">
            Traccia entrate e spese, visualizza statistiche dettagliate e prendi il controllo del tuo budget
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.2s">
            <router-link to="/register" class="btn-primary text-lg px-8 py-3.5 shadow-xl hover:shadow-2xl">
              Inizia Gratis
            </router-link>
            <router-link to="/login" class="btn-secondary text-lg px-8 py-3.5 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              Accedi
            </router-link>
          </div>
        </div>

        <!-- Demo Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up" style="animation-delay: 0.4s">
          <div class="card text-center transform hover:scale-105 transition-all bg-white/10 backdrop-blur-sm border border-white/20">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-3xl font-bold text-white">€ 3.450</div>
            <div class="text-gray-200 mt-2">Saldo Totale</div>
          </div>
          <div class="card text-center transform hover:scale-105 transition-all bg-white/10 backdrop-blur-sm border border-white/20">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="text-3xl font-bold text-white">€ 2.500</div>
            <div class="text-gray-200 mt-2">Entrate Mensili</div>
          </div>
          <div class="card text-center transform hover:scale-105 transition-all bg-white/10 backdrop-blur-sm border border-white/20">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div class="text-3xl font-bold text-white">€ 1.350</div>
            <div class="text-gray-200 mt-2">Spese Mensili</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white scroll-mt-20">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-primary-dark">Come Funziona</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="card text-center animate-on-scroll hover:shadow-2xl transition-all duration-300"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-primary-navy/10 flex items-center justify-center">
                <svg v-if="feature.icon === 'document'" class="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <svg v-else-if="feature.icon === 'refresh'" class="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg v-else-if="feature.icon === 'chart'" class="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <svg v-else-if="feature.icon === 'download'" class="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-3 text-primary-navy">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Chart Section -->
    <section id="demo" class="py-20 bg-gray-50 scroll-mt-20">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-primary-dark">Visualizza i Tuoi Dati</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="card">
            <h3 class="text-2xl font-bold mb-6 text-primary-navy">Spese per Categoria</h3>
            <div class="chart-container">
              <canvas ref="categoryChart"></canvas>
            </div>
          </div>
          <div class="card">
            <h3 class="text-2xl font-bold mb-6 text-primary-navy">Entrate vs Spese</h3>
            <div class="chart-container">
              <canvas ref="trendsChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-navy text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Pronto a Iniziare?</h2>
        <p class="text-xl mb-8 text-gray-200">Registrati ora e prendi il controllo delle tue finanze</p>
        <router-link to="/register" class="btn-primary text-lg px-8 py-3 bg-white text-primary-navy hover:bg-gray-100">
          Crea Account Gratuito
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary-dark text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2025 Finanze App. Tutti i diritti riservati.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const headerScrolled = ref(false)

const handleScroll = () => {
  headerScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const categoryChart = ref(null)
const trendsChart = ref(null)

const features = [
  {
    icon: 'document',
    title: 'Traccia Transazioni',
    description: 'Registra facilmente entrate e spese con categorie personalizzate'
  },
  {
    icon: 'refresh',
    title: 'Ricorrenze',
    description: 'Imposta transazioni ricorrenti giornaliere, settimanali o mensili'
  },
  {
    icon: 'chart',
    title: 'Statistiche',
    description: 'Visualizza grafici dettagliati e analisi delle tue finanze'
  },
  {
    icon: 'download',
    title: 'Esporta Dati',
    description: 'Scarica i tuoi dati in formato Excel o PDF'
  }
]

onMounted(() => {
  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  })

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el)
  })

  // Create demo charts
  if (categoryChart.value) {
    new Chart(categoryChart.value, {
      type: 'doughnut',
      data: {
        labels: ['Alimentari', 'Trasporti', 'Affitto', 'Bollette', 'Intrattenimento'],
        datasets: [{
          data: [350, 200, 800, 120, 150],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }

  if (trendsChart.value) {
    new Chart(trendsChart.value, {
      type: 'line',
      data: {
        labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
        datasets: [
          {
            label: 'Entrate',
            data: [2500, 2600, 2450, 2700, 2500, 2650],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          },
          {
            label: 'Spese',
            data: [1800, 1650, 1900, 1750, 1850, 1700],
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
