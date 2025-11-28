<template>
  <div class="dashboard-page min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-dark py-4 md:py-8">
    <div class="container mx-auto px-3 md:px-4">
      <div class="mb-6 md:mb-8">
        <h1 class="text-2xl md:text-4xl font-bold text-white mb-4">Dashboard</h1>
        
        <!-- Date Filter -->
        <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-4 md:p-6 shadow-xl mb-6">
          <div class="flex flex-col md:flex-row gap-3 md:gap-4 md:items-end">
            <div class="flex-1 w-full">
              <label class="block text-sm font-medium text-neutral-300 mb-2">Data Inizio</label>
              <input 
                v-model="filters.startDate" 
                type="date" 
                class="w-full px-3 md:px-4 py-2 md:py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white text-sm md:text-base"
              />
            </div>
            <div class="flex-1 w-full">
              <label class="block text-sm font-medium text-neutral-300 mb-2">Data Fine</label>
              <input 
                v-model="filters.endDate" 
                type="date" 
                class="w-full px-3 md:px-4 py-2 md:py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white text-sm md:text-base"
              />
            </div>
            <div class="flex gap-2 w-full md:w-auto">
              <button @click="applyFilters" class="btn-primary flex-1 md:flex-none text-sm md:text-base">
                Applica
              </button>
              <button @click="clearFilters" class="btn-secondary flex-1 md:flex-none text-sm md:text-base">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="spinner"></div>
      </div>

      <!-- Statistics Cards -->
      <div v-else-if="statistics" class="space-y-8">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-slide-up">
          <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-4 md:p-6 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-xs md:text-sm text-neutral-300 mb-1">Saldo Totale</p>
                <p class="text-2xl md:text-3xl font-bold text-white">€ {{ formatNumber(statistics.balance) }}</p>
              </div>
              <div class="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-accent-blue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-neutral-800/80 backdrop-blur-sm border-l-4 border-l-success border border-neutral-700 rounded-lg p-4 md:p-6 shadow-xl">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-xs md:text-sm text-neutral-300 mb-1">Entrate Totali</p>
                <p class="text-2xl md:text-3xl font-bold text-success-light">€ {{ formatNumber(statistics.total_income) }}</p>
              </div>
              <div class="w-12 h-12 bg-success-light/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-success-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-neutral-800/80 backdrop-blur-sm border-l-4 border-l-error border border-neutral-700 rounded-lg p-4 md:p-6 shadow-xl sm:col-span-2 md:col-span-1">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-xs md:text-sm text-neutral-300 mb-1">Spese Totali</p>
                <p class="text-2xl md:text-3xl font-bold text-error-light">€ {{ formatNumber(statistics.total_expense) }}</p>
              </div>
              <div class="w-12 h-12 bg-error-light/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-error-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Average Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl">
            <h3 class="text-lg font-semibold text-neutral-300 mb-2">Media Mensile Entrate</h3>
            <p class="text-2xl font-bold text-success-light">€ {{ formatNumber(statistics.average_monthly_income) }}</p>
          </div>
          <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl">
            <h3 class="text-lg font-semibold text-neutral-300 mb-2">Media Mensile Spese</h3>
            <p class="text-2xl font-bold text-error-light">€ {{ formatNumber(statistics.average_monthly_expense) }}</p>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <!-- Expenses by Category -->
          <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-4 md:p-6 shadow-xl">
            <h3 class="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white">Spese per Categoria</h3>
            <div class="chart-container" style="height: 280px; md:height: 350px;">
              <canvas ref="expensesCategoryChart"></canvas>
              <div v-if="!statistics?.expenses_by_category || statistics.expenses_by_category.length === 0" class="flex items-center justify-center h-full text-neutral-400 text-sm md:text-base">
                <p>Nessun dato disponibile per le spese</p>
              </div>
            </div>
          </div>

          <!-- Income by Category -->
          <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-4 md:p-6 shadow-xl">
            <h3 class="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white">Entrate per Categoria</h3>
            <div class="chart-container" style="height: 280px; md:height: 350px;">
              <canvas ref="incomeCategoryChart"></canvas>
              <div v-if="!statistics?.income_by_category || statistics.income_by_category.length === 0" class="flex items-center justify-center h-full text-neutral-400 text-sm md:text-base">
                <p>Nessun dato disponibile per le entrate</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Trends -->
        <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-4 md:p-6 shadow-xl">
          <h3 class="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white">Andamento Mensile</h3>
          <div class="chart-container" style="height: 300px; md:height: 400px;">
            <canvas ref="trendsChart"></canvas>
            <div v-if="!statistics?.monthly_trends || statistics.monthly_trends.length === 0" class="flex items-center justify-center h-full text-neutral-400 text-sm md:text-base">
              <p>Nessun dato disponibile per i trend mensili</p>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-4 md:p-6 shadow-xl">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
            <h3 class="text-lg md:text-2xl font-bold text-white">Transazioni Recenti</h3>
            <router-link to="/transactions" class="text-accent-blue-light hover:text-accent-blue font-medium transition-colors text-sm md:text-base">
              Vedi tutte →
            </router-link>
          </div>
          <div class="overflow-x-auto -mx-4 md:mx-0">
            <div class="min-w-full px-4 md:px-0">
              <!-- Mobile Card View -->
              <div class="md:hidden space-y-3">
                <div 
                  v-for="transaction in statistics.recent_transactions" 
                  :key="transaction.id"
                  class="bg-neutral-700/30 rounded-lg p-3 border border-neutral-600"
                >
                  <div class="flex justify-between items-start mb-2">
                    <span class="text-xs text-neutral-400">{{ formatDate(transaction.date) }}</span>
                    <span class="px-2 py-1 rounded text-xs font-medium" :class="transaction.type === 'income' ? 'bg-success-light/20 text-success-light' : 'bg-error-light/20 text-error-light'">
                      {{ transaction.category_name || 'Altro' }}
                    </span>
                  </div>
                  <p class="text-sm text-neutral-300 mb-1">{{ transaction.description || '-' }}</p>
                  <p class="text-lg font-bold" :class="transaction.type === 'income' ? 'text-success-light' : 'text-error-light'">
                    {{ transaction.type === 'income' ? '+' : '-' }}€ {{ formatNumber(transaction.amount) }}
                  </p>
                </div>
              </div>
              <!-- Desktop Table View -->
              <table class="hidden md:table w-full">
                <thead>
                  <tr class="border-b border-neutral-700">
                    <th class="text-left py-3 px-4 text-neutral-300 font-semibold text-sm">Data</th>
                    <th class="text-left py-3 px-4 text-neutral-300 font-semibold text-sm">Descrizione</th>
                    <th class="text-left py-3 px-4 text-neutral-300 font-semibold text-sm">Categoria</th>
                    <th class="text-right py-3 px-4 text-neutral-300 font-semibold text-sm">Importo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="transaction in statistics.recent_transactions" 
                    :key="transaction.id"
                    class="border-b border-neutral-700 hover:bg-neutral-700/30 transition"
                  >
                    <td class="py-3 px-4 text-neutral-300 text-sm">{{ formatDate(transaction.date) }}</td>
                    <td class="py-3 px-4 text-neutral-300 text-sm">{{ transaction.description || '-' }}</td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-1 rounded text-xs font-medium" :class="transaction.type === 'income' ? 'bg-success-light/20 text-success-light' : 'bg-error-light/20 text-error-light'">
                        {{ transaction.category_name || 'Altro' }}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right font-semibold text-sm" :class="transaction.type === 'income' ? 'text-success-light' : 'text-error-light'">
                      {{ transaction.type === 'income' ? '+' : '-' }}€ {{ formatNumber(transaction.amount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useTransactionsStore } from '../stores/transactions'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const transactionsStore = useTransactionsStore()

const loading = ref(true)
const statistics = ref(null)
const filters = ref({
  startDate: '',
  endDate: ''
})

const expensesCategoryChart = ref(null)
const incomeCategoryChart = ref(null)
const trendsChart = ref(null)

let expensesChart = null
let incomeChart = null
let trendsChartInstance = null

const formatNumber = (value) => {
  return parseFloat(value).toFixed(2)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('it-IT')
}

const loadStatistics = async () => {
  loading.value = true
  try {
    await transactionsStore.fetchStatistics(filters.value)
    statistics.value = transactionsStore.statistics
    
    await nextTick()
    renderCharts()
    
    const renderEndTime = performance.now()
    console.log(`🖥️ [Dashboard] Dati renderizzati a schermo:`, renderEndTime.toFixed(2), 'ms')
  } catch (error) {
    // Errore nel caricamento statistiche
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  loadStatistics()
}

const clearFilters = () => {
  filters.value = {
    startDate: '',
    endDate: ''
  }
  loadStatistics()
}

const renderCharts = () => {
  if (!statistics.value) {
    return
  }

  if (typeof Chart === 'undefined') {
    return
  }

  // Expenses by Category Chart
  if (expensesCategoryChart.value && statistics.value.expenses_by_category && statistics.value.expenses_by_category.length > 0) {
    try {
      const labels = statistics.value.expenses_by_category.map(c => c.name || 'Altro')
      const data = statistics.value.expenses_by_category.map(c => c.total)
      
      if (expensesChart) {
        expensesChart.data.labels = labels
        expensesChart.data.datasets[0].data = data
        expensesChart.update()
      } else {
        expensesChart = new Chart(expensesCategoryChart.value, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                '#2563EB', '#059669', '#DC2626', '#64748B', '#7C3AED',
                '#EA580C', '#0891B2', '#BE185D', '#475569', '#0F172A'
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#E2E8F0',
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        })
      }
    } catch (error) {
      // Errore nella creazione del grafico spese
    }
  }

  // Income by Category Chart
  if (incomeCategoryChart.value && statistics.value.income_by_category && statistics.value.income_by_category.length > 0) {
    try {
      const labels = statistics.value.income_by_category.map(c => c.name || 'Altro')
      const data = statistics.value.income_by_category.map(c => c.total)
      
      if (incomeChart) {
        incomeChart.data.labels = labels
        incomeChart.data.datasets[0].data = data
        incomeChart.update()
      } else {
        incomeChart = new Chart(incomeCategoryChart.value, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Entrate',
              data: data,
              backgroundColor: '#059669'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#E2E8F0',
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: 'rgba(226, 232, 240, 0.1)'
                }
              },
              x: {
                ticks: {
                  color: '#E2E8F0',
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: 'rgba(226, 232, 240, 0.1)'
                }
              }
            }
          }
        })
      }
    } catch (error) {
      // Errore nella creazione del grafico entrate
    }
  }

  // Monthly Trends Chart
  if (trendsChart.value && statistics.value.monthly_trends && statistics.value.monthly_trends.length > 0) {
    try {
      const labels = statistics.value.monthly_trends.map(t => t.month)
      const incomeData = statistics.value.monthly_trends.map(t => t.income)
      const expenseData = statistics.value.monthly_trends.map(t => t.expense)
      
      if (trendsChartInstance) {
        trendsChartInstance.data.labels = labels
        trendsChartInstance.data.datasets[0].data = incomeData
        trendsChartInstance.data.datasets[1].data = expenseData
        trendsChartInstance.update()
      } else {
        trendsChartInstance = new Chart(trendsChart.value, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Entrate',
                data: incomeData,
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Spese',
                data: expenseData,
                borderColor: '#DC2626',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                tension: 0.4,
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#E2E8F0',
                  font: {
                    size: 12
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#E2E8F0',
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: 'rgba(226, 232, 240, 0.1)'
                }
              },
              x: {
                ticks: {
                  color: '#E2E8F0',
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: 'rgba(226, 232, 240, 0.1)'
                }
              }
            }
          }
        })
      }
    } catch (error) {
      // Errore nella creazione del grafico trend
    }
  }
}

watch(statistics, async () => {
  if (statistics.value && !loading.value) {
    await nextTick()
    renderCharts()
  }
})

onMounted(() => {
  loadStatistics()
})
</script>
