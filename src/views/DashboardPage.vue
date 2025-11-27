<template>
  <div class="dashboard-page min-h-screen bg-neutral-50 py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-primary-dark mb-4">Dashboard</h1>
        
        <!-- Date Filter -->
        <div class="card mb-6">
          <div class="flex flex-col md:flex-row gap-4 items-end">
            <div class="flex-1">
              <label class="label">Data Inizio</label>
              <input 
                v-model="filters.startDate" 
                type="date" 
                class="input-field"
              />
            </div>
            <div class="flex-1">
              <label class="label">Data Fine</label>
              <input 
                v-model="filters.endDate" 
                type="date" 
                class="input-field"
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
          <div class="card bg-primary-dark text-white border-0">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-neutral-300 mb-1">Saldo Totale</p>
                <p class="text-3xl font-bold">€ {{ formatNumber(statistics.balance) }}</p>
              </div>
              <div class="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-accent-blue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="card bg-white border-l-4 border-l-success">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-neutral-600 mb-1">Entrate Totali</p>
                <p class="text-3xl font-bold text-success">€ {{ formatNumber(statistics.total_income) }}</p>
              </div>
              <div class="w-12 h-12 bg-success-light/10 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div class="card bg-white border-l-4 border-l-error">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-neutral-600 mb-1">Spese Totali</p>
                <p class="text-3xl font-bold text-error">€ {{ formatNumber(statistics.total_expense) }}</p>
              </div>
              <div class="w-12 h-12 bg-error-light/10 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Average Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-700 mb-2">Media Mensile Entrate</h3>
            <p class="text-2xl font-bold text-success">€ {{ formatNumber(statistics.average_monthly_income) }}</p>
          </div>
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-700 mb-2">Media Mensile Spese</h3>
            <p class="text-2xl font-bold text-error">€ {{ formatNumber(statistics.average_monthly_expense) }}</p>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Expenses by Category -->
          <div class="card">
            <h3 class="text-2xl font-bold mb-6 text-primary-dark">Spese per Categoria</h3>
            <div class="chart-container" style="height: 350px;">
              <canvas ref="expensesCategoryChart"></canvas>
            </div>
          </div>

          <!-- Income by Category -->
          <div class="card">
            <h3 class="text-2xl font-bold mb-6 text-primary-dark">Entrate per Categoria</h3>
            <div class="chart-container" style="height: 350px;">
              <canvas ref="incomeCategoryChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Monthly Trends -->
        <div class="card">
          <h3 class="text-2xl font-bold mb-6 text-primary-dark">Andamento Mensile</h3>
          <div class="chart-container" style="height: 400px;">
            <canvas ref="trendsChart"></canvas>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-primary-dark">Transazioni Recenti</h3>
            <router-link to="/transactions" class="text-accent-blue hover:text-accent-blue-dark font-medium">
              Vedi tutte →
            </router-link>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 px-4">Data</th>
                  <th class="text-left py-3 px-4">Descrizione</th>
                  <th class="text-left py-3 px-4">Categoria</th>
                  <th class="text-right py-3 px-4">Importo</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="transaction in statistics.recent_transactions" 
                  :key="transaction.id"
                  class="border-b hover:bg-neutral-50 transition"
                >
                  <td class="py-3 px-4">{{ formatDate(transaction.date) }}</td>
                  <td class="py-3 px-4">{{ transaction.description || '-' }}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded text-sm font-medium" :class="transaction.type === 'income' ? 'bg-success-light/10 text-success-dark' : 'bg-error-light/10 text-error-dark'">
                      {{ transaction.category_name || 'Altro' }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right font-semibold" :class="transaction.type === 'income' ? 'text-success' : 'text-error'">
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
  } catch (error) {
    console.error('Error loading statistics:', error)
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
  if (!statistics.value) return

  // Destroy existing charts
  if (expensesChart) expensesChart.destroy()
  if (incomeChart) incomeChart.destroy()
  if (trendsChartInstance) trendsChartInstance.destroy()

  // Expenses by Category Chart
  if (expensesCategoryChart.value && statistics.value.expenses_by_category.length > 0) {
    expensesChart = new Chart(expensesCategoryChart.value, {
      type: 'doughnut',
      data: {
        labels: statistics.value.expenses_by_category.map(c => c.name || 'Altro'),
        datasets: [{
          data: statistics.value.expenses_by_category.map(c => c.total),
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
            position: 'bottom'
          }
        }
      }
    })
  }

  // Income by Category Chart
  if (incomeCategoryChart.value && statistics.value.income_by_category.length > 0) {
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
            beginAtZero: true
          }
        }
      }
    })
  }

  // Monthly Trends Chart
  if (trendsChart.value && statistics.value.monthly_trends.length > 0) {
    trendsChartInstance = new Chart(trendsChart.value, {
      type: 'line',
      data: {
        labels: statistics.value.monthly_trends.map(t => t.month),
        datasets: [
          {
            label: 'Entrate',
            data: statistics.value.monthly_trends.map(t => t.income),
            borderColor: '#059669',
            backgroundColor: 'rgba(5, 150, 105, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Spese',
            data: statistics.value.monthly_trends.map(t => t.expense),
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
}

onMounted(() => {
  loadStatistics()
})
</script>
