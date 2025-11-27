<template>
  <div class="dashboard-page min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-dark py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">Dashboard</h1>
        
        <!-- Date Filter -->
        <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl mb-6">
          <div class="flex flex-col md:flex-row gap-4 items-end">
            <div class="flex-1">
              <label class="block text-sm font-medium text-neutral-300 mb-2">Data Inizio</label>
              <input 
                v-model="filters.startDate" 
                type="date" 
                class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white"
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-neutral-300 mb-2">Data Fine</label>
              <input 
                v-model="filters.endDate" 
                type="date" 
                class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white"
              />
            </div>
            <button @click="applyFilters" class="btn-primary">
              Applica Filtro
            </button>
            <button @click="clearFilters" class="btn-secondary">
              Reset
            </button>
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-neutral-300 mb-1">Saldo Totale</p>
                <p class="text-3xl font-bold text-white">€ {{ formatNumber(statistics.balance) }}</p>
              </div>
              <div class="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-accent-blue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-neutral-800/80 backdrop-blur-sm border-l-4 border-l-success border border-neutral-700 rounded-lg p-6 shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-neutral-300 mb-1">Entrate Totali</p>
                <p class="text-3xl font-bold text-success-light">€ {{ formatNumber(statistics.total_income) }}</p>
              </div>
              <div class="w-12 h-12 bg-success-light/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-success-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-neutral-800/80 backdrop-blur-sm border-l-4 border-l-error border border-neutral-700 rounded-lg p-6 shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-neutral-300 mb-1">Spese Totali</p>
                <p class="text-3xl font-bold text-error-light">€ {{ formatNumber(statistics.total_expense) }}</p>
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Expenses by Category -->
          <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl">
            <h3 class="text-2xl font-bold mb-6 text-white">Spese per Categoria</h3>
            <div class="chart-container" style="height: 350px;">
              <canvas ref="expensesCategoryChart"></canvas>
              <div v-if="!statistics?.expenses_by_category || statistics.expenses_by_category.length === 0" class="flex items-center justify-center h-full text-neutral-400">
                <p>Nessun dato disponibile per le spese</p>
              </div>
            </div>
          </div>

          <!-- Income by Category -->
          <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl">
            <h3 class="text-2xl font-bold mb-6 text-white">Entrate per Categoria</h3>
            <div class="chart-container" style="height: 350px;">
              <canvas ref="incomeCategoryChart"></canvas>
              <div v-if="!statistics?.income_by_category || statistics.income_by_category.length === 0" class="flex items-center justify-center h-full text-neutral-400">
                <p>Nessun dato disponibile per le entrate</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Trends -->
        <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl">
          <h3 class="text-2xl font-bold mb-6 text-white">Andamento Mensile</h3>
          <div class="chart-container" style="height: 400px;">
            <canvas ref="trendsChart"></canvas>
            <div v-if="!statistics?.monthly_trends || statistics.monthly_trends.length === 0" class="flex items-center justify-center h-full text-neutral-400">
              <p>Nessun dato disponibile per i trend mensili</p>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-white">Transazioni Recenti</h3>
            <router-link to="/transactions" class="text-accent-blue-light hover:text-accent-blue font-medium transition-colors">
              Vedi tutte →
            </router-link>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-neutral-700">
                  <th class="text-left py-3 px-4 text-neutral-300 font-semibold">Data</th>
                  <th class="text-left py-3 px-4 text-neutral-300 font-semibold">Descrizione</th>
                  <th class="text-left py-3 px-4 text-neutral-300 font-semibold">Categoria</th>
                  <th class="text-right py-3 px-4 text-neutral-300 font-semibold">Importo</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="transaction in statistics.recent_transactions" 
                  :key="transaction.id"
                  class="border-b border-neutral-700 hover:bg-neutral-700/30 transition"
                >
                  <td class="py-3 px-4 text-neutral-300">{{ formatDate(transaction.date) }}</td>
                  <td class="py-3 px-4 text-neutral-300">{{ transaction.description || '-' }}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded text-sm font-medium" :class="transaction.type === 'income' ? 'bg-success-light/20 text-success-light' : 'bg-error-light/20 text-error-light'">
                      {{ transaction.category_name || 'Altro' }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right font-semibold" :class="transaction.type === 'income' ? 'text-success-light' : 'text-error-light'">
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
</template>

<script setup>
import { ref, onMounted, watch, nextTick, watchEffect } from 'vue'
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

const waitForCanvas = (ref, maxAttempts = 20, delay = 100) => {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const checkCanvas = () => {
      attempts++
      if (ref.value) {
        console.log(`✅ [Dashboard] Canvas trovato dopo ${attempts} tentativi`)
        resolve(ref.value)
      } else if (attempts >= maxAttempts) {
        console.warn(`⚠️ [Dashboard] Canvas non trovato dopo ${maxAttempts} tentativi`)
        reject(new Error('Canvas non disponibile'))
      } else {
        setTimeout(checkCanvas, delay)
      }
    }
    checkCanvas()
  })
}

const loadStatistics = async () => {
  loading.value = true
  try {
    console.log('📊 [Dashboard] Caricamento statistiche...')
    await transactionsStore.fetchStatistics(filters.value)
    statistics.value = transactionsStore.statistics
    console.log('✅ [Dashboard] Statistiche caricate:', statistics.value)
    console.log('📈 [Dashboard] Expenses by category:', statistics.value?.expenses_by_category)
    console.log('📈 [Dashboard] Income by category:', statistics.value?.income_by_category)
    console.log('📈 [Dashboard] Monthly trends:', statistics.value?.monthly_trends)
    
    // Aspetta che il DOM sia aggiornato
    await nextTick()
    console.log('⏳ [Dashboard] NextTick completato, attesa canvas...')
    
    // Aspetta che i canvas siano disponibili nel DOM
    try {
      await Promise.all([
        waitForCanvas(expensesCategoryChart).catch(() => null),
        waitForCanvas(incomeCategoryChart).catch(() => null),
        waitForCanvas(trendsChart).catch(() => null)
      ])
      console.log('✅ [Dashboard] Canvas disponibili, rendering grafici...')
      renderCharts()
    } catch (error) {
      console.error('❌ [Dashboard] Errore nell\'attesa dei canvas:', error)
      // Prova comunque a renderizzare dopo un breve delay
      setTimeout(() => {
        console.log('🔄 [Dashboard] Retry rendering grafici...')
        renderCharts()
      }, 500)
    }
  } catch (error) {
    console.error('❌ [Dashboard] Errore nel caricamento statistiche:', error)
    console.error('❌ [Dashboard] Dettagli errore:', error.response?.data || error.message)
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
  console.log('🎨 [Dashboard] Inizio rendering grafici...')
  console.log('📊 [Dashboard] Statistics:', statistics.value)
  
  if (!statistics.value) {
    console.warn('⚠️ [Dashboard] Nessuna statistica disponibile')
    return
  }

  // Verifica che Chart.js sia disponibile
  if (typeof Chart === 'undefined') {
    console.error('❌ [Dashboard] Chart.js non è disponibile!')
    return
  }
  console.log('✅ [Dashboard] Chart.js disponibile')

  // Destroy existing charts
  if (expensesChart) {
    console.log('🗑️ [Dashboard] Distruzione grafico spese esistente')
    expensesChart.destroy()
  }
  if (incomeChart) {
    console.log('🗑️ [Dashboard] Distruzione grafico entrate esistente')
    incomeChart.destroy()
  }
  if (trendsChartInstance) {
    console.log('🗑️ [Dashboard] Distruzione grafico trend esistente')
    trendsChartInstance.destroy()
  }

  // Expenses by Category Chart
  console.log('📊 [Dashboard] Verifica canvas spese:', expensesCategoryChart.value)
  console.log('📊 [Dashboard] Dati spese:', statistics.value.expenses_by_category)
  
  if (expensesCategoryChart.value && statistics.value.expenses_by_category && statistics.value.expenses_by_category.length > 0) {
    console.log('✅ [Dashboard] Creazione grafico spese per categoria...')
    try {
      const labels = statistics.value.expenses_by_category.map(c => c.name || 'Altro')
      const data = statistics.value.expenses_by_category.map(c => c.total)
      console.log('📊 [Dashboard] Labels spese:', labels)
      console.log('📊 [Dashboard] Data spese:', data)
      
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
      console.log('✅ [Dashboard] Grafico spese creato con successo')
    } catch (error) {
      console.error('❌ [Dashboard] Errore nella creazione del grafico spese:', error)
    }
  } else {
    console.warn('⚠️ [Dashboard] Impossibile creare grafico spese:', {
      canvas: !!expensesCategoryChart.value,
      hasData: statistics.value.expenses_by_category?.length > 0,
      dataLength: statistics.value.expenses_by_category?.length || 0
    })
  }

  // Income by Category Chart
  console.log('📊 [Dashboard] Verifica canvas entrate:', incomeCategoryChart.value)
  console.log('📊 [Dashboard] Dati entrate:', statistics.value.income_by_category)
  
  if (incomeCategoryChart.value && statistics.value.income_by_category && statistics.value.income_by_category.length > 0) {
    console.log('✅ [Dashboard] Creazione grafico entrate per categoria...')
    try {
      const labels = statistics.value.income_by_category.map(c => c.name || 'Altro')
      const data = statistics.value.income_by_category.map(c => c.total)
      console.log('📊 [Dashboard] Labels entrate:', labels)
      console.log('📊 [Dashboard] Data entrate:', data)
      
      incomeChart = new Chart(incomeCategoryChart.value, {
      type: 'bar',
      data: {
        labels: statistics.value.income_by_category.map(c => c.name || 'Altro'),
        datasets: [{
          label: 'Entrate',
          data: statistics.value.income_by_category.map(c => c.total),
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
    console.log('✅ [Dashboard] Grafico entrate creato con successo')
    } catch (error) {
      console.error('❌ [Dashboard] Errore nella creazione del grafico entrate:', error)
    }
  } else {
    console.warn('⚠️ [Dashboard] Impossibile creare grafico entrate:', {
      canvas: !!incomeCategoryChart.value,
      hasData: statistics.value.income_by_category?.length > 0,
      dataLength: statistics.value.income_by_category?.length || 0
    })
  }

  // Monthly Trends Chart
  console.log('📊 [Dashboard] Verifica canvas trend:', trendsChart.value)
  console.log('📊 [Dashboard] Dati trend:', statistics.value.monthly_trends)
  
  if (trendsChart.value && statistics.value.monthly_trends && statistics.value.monthly_trends.length > 0) {
    console.log('✅ [Dashboard] Creazione grafico trend mensile...')
    try {
      const labels = statistics.value.monthly_trends.map(t => t.month)
      const incomeData = statistics.value.monthly_trends.map(t => t.income)
      const expenseData = statistics.value.monthly_trends.map(t => t.expense)
      console.log('📊 [Dashboard] Labels trend:', labels)
      console.log('📊 [Dashboard] Data entrate trend:', incomeData)
      console.log('📊 [Dashboard] Data spese trend:', expenseData)
      
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
    console.log('✅ [Dashboard] Grafico trend creato con successo')
    } catch (error) {
      console.error('❌ [Dashboard] Errore nella creazione del grafico trend:', error)
    }
  } else {
    console.warn('⚠️ [Dashboard] Impossibile creare grafico trend:', {
      canvas: !!trendsChart.value,
      hasData: statistics.value.monthly_trends?.length > 0,
      dataLength: statistics.value.monthly_trends?.length || 0
    })
  }
  
  console.log('🎨 [Dashboard] Rendering grafici completato')
}

// Watch per renderizzare i grafici quando i canvas sono disponibili
watchEffect(() => {
  if (statistics.value && !loading.value) {
    // Aspetta un po' per assicurarsi che il DOM sia aggiornato
    setTimeout(() => {
      if (expensesCategoryChart.value || incomeCategoryChart.value || trendsChart.value) {
        console.log('🔄 [Dashboard] WatchEffect: Canvas disponibili, rendering grafici...')
        renderCharts()
      }
    }, 100)
  }
})

onMounted(() => {
  console.log('🚀 [Dashboard] Componente montato')
  console.log('📊 [Dashboard] Chart.js disponibile:', typeof Chart !== 'undefined')
  console.log('📊 [Dashboard] Chart version:', Chart?.version || 'N/A')
  loadStatistics()
})
</script>
