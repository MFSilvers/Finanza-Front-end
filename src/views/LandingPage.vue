<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero bg-gradient-to-br from-primary-dark via-primary-navy to-primary-green text-white min-h-screen flex items-center">
      <div class="container mx-auto px-4">
        <div class="text-center animate-fade-in">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-slide-down">
            Gestisci le Tue Finanze con Semplicità
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
            Traccia entrate e spese, visualizza statistiche dettagliate e prendi il controllo del tuo budget
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.2s">
            <router-link to="/register" class="btn-primary text-lg px-8 py-3">
              Inizia Gratis
            </router-link>
            <router-link to="/login" class="btn-secondary text-lg px-8 py-3 bg-white">
              Accedi
            </router-link>
          </div>
        </div>

        <!-- Demo Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up" style="animation-delay: 0.4s">
          <div class="card text-center transform hover:scale-105 transition-all">
            <div class="text-4xl mb-2">💰</div>
            <div class="text-3xl font-bold text-primary-navy">€ 3.450</div>
            <div class="text-gray-600 mt-2">Saldo Totale</div>
          </div>
          <div class="card text-center transform hover:scale-105 transition-all">
            <div class="text-4xl mb-2">📈</div>
            <div class="text-3xl font-bold text-green-600">€ 2.500</div>
            <div class="text-gray-600 mt-2">Entrate Mensili</div>
          </div>
          <div class="card text-center transform hover:scale-105 transition-all">
            <div class="text-4xl mb-2">📉</div>
            <div class="text-3xl font-bold text-red-600">€ 1.350</div>
            <div class="text-gray-600 mt-2">Spese Mensili</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-primary-dark">Come Funziona</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="card text-center animate-on-scroll"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="text-5xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold mb-3 text-primary-navy">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Chart Section -->
    <section class="py-20 bg-gray-50">
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
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const categoryChart = ref(null)
const trendsChart = ref(null)

const features = [
  {
    icon: '📝',
    title: 'Traccia Transazioni',
    description: 'Registra facilmente entrate e spese con categorie personalizzate'
  },
  {
    icon: '🔄',
    title: 'Ricorrenze',
    description: 'Imposta transazioni ricorrenti giornaliere, settimanali o mensili'
  },
  {
    icon: '📊',
    title: 'Statistiche',
    description: 'Visualizza grafici dettagliati e analisi delle tue finanze'
  },
  {
    icon: '📥',
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
