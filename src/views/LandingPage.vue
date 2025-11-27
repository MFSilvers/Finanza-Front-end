<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero bg-neutral-900 text-white min-h-screen flex items-center">
      <div class="container mx-auto px-4">
        <div class="text-center animate-fade-in">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-slide-down text-white">
            Gestisci le Tue Finanze con Semplicità
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-neutral-300 animate-slide-up">
            Traccia entrate e spese, visualizza statistiche dettagliate e prendi il controllo del tuo budget
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.2s">
            <router-link to="/register" class="btn-primary text-lg px-8 py-3">
              Inizia Gratis
            </router-link>
            <router-link to="/login" class="btn-secondary text-lg px-8 py-3 bg-white text-primary-dark hover:bg-neutral-50">
              Accedi
            </router-link>
          </div>
        </div>

        <!-- Demo Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up" style="animation-delay: 0.4s">
          <div class="card text-center transform hover:scale-[1.02] transition-all bg-white">
            <div class="w-12 h-12 mx-auto mb-4 bg-accent-blue/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-3xl font-bold text-primary-dark">€ 3.450</div>
            <div class="text-neutral-600 mt-2 text-sm">Saldo Totale</div>
          </div>
          <div class="card text-center transform hover:scale-[1.02] transition-all bg-white">
            <div class="w-12 h-12 mx-auto mb-4 bg-success-light/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="text-3xl font-bold text-success">€ 2.500</div>
            <div class="text-neutral-600 mt-2 text-sm">Entrate Mensili</div>
          </div>
          <div class="card text-center transform hover:scale-[1.02] transition-all bg-white">
            <div class="w-12 h-12 mx-auto mb-4 bg-error-light/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6 6" />
              </svg>
            </div>
            <div class="text-3xl font-bold text-error">€ 1.350</div>
            <div class="text-neutral-600 mt-2 text-sm">Spese Mensili</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-neutral-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-primary-dark">Come Funziona</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            class="card text-center animate-on-scroll"
            style="animation-delay: 0s"
          >
            <div class="w-16 h-16 mx-auto mb-4 bg-accent-blue/10 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-primary-dark">Traccia Transazioni</h3>
            <p class="text-neutral-600">Registra facilmente entrate e spese con categorie personalizzate</p>
          </div>
          <div 
            class="card text-center animate-on-scroll"
            style="animation-delay: 0.1s"
          >
            <div class="w-16 h-16 mx-auto mb-4 bg-accent-blue/10 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-primary-dark">Ricorrenze</h3>
            <p class="text-neutral-600">Imposta transazioni ricorrenti giornaliere, settimanali o mensili</p>
          </div>
          <div 
            class="card text-center animate-on-scroll"
            style="animation-delay: 0.2s"
          >
            <div class="w-16 h-16 mx-auto mb-4 bg-accent-blue/10 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-primary-dark">Statistiche</h3>
            <p class="text-neutral-600">Visualizza grafici dettagliati e analisi delle tue finanze</p>
          </div>
          <div 
            class="card text-center animate-on-scroll"
            style="animation-delay: 0.3s"
          >
            <div class="w-16 h-16 mx-auto mb-4 bg-accent-blue/10 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-primary-dark">Esporta Dati</h3>
            <p class="text-neutral-600">Scarica i tuoi dati in formato Excel o PDF</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Chart Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-primary-dark">Visualizza i Tuoi Dati</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="card">
            <h3 class="text-2xl font-bold mb-6 text-primary-dark">Spese per Categoria</h3>
            <div class="chart-container">
              <canvas ref="categoryChart"></canvas>
            </div>
          </div>
          <div class="card">
            <h3 class="text-2xl font-bold mb-6 text-primary-dark">Entrate vs Spese</h3>
            <div class="chart-container">
              <canvas ref="trendsChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-dark text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Pronto a Iniziare?</h2>
        <p class="text-xl mb-8 text-neutral-300">Registrati ora e prendi il controllo delle tue finanze</p>
        <router-link to="/register" class="btn-primary text-lg px-8 py-3">
          Crea Account Gratuito
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-neutral-900 text-neutral-300 py-8 border-t border-neutral-800">
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
            '#2563EB',
            '#059669',
            '#DC2626',
            '#64748B',
            '#7C3AED'
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
            borderColor: '#059669',
            backgroundColor: 'rgba(5, 150, 105, 0.1)',
            tension: 0.4
          },
          {
            label: 'Spese',
            data: [1800, 1650, 1900, 1750, 1850, 1700],
            borderColor: '#DC2626',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
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
