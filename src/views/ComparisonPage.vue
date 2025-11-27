<template>
  <div class="comparison-page min-h-screen bg-neutral-50 py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-primary-dark mb-4">Confronto e Esportazione</h1>
        
        <!-- Comparison Filters -->
        <div class="card mb-6">
          <h3 class="text-xl font-bold mb-4 text-primary-dark">Seleziona Periodi da Confrontare</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Period 1 -->
            <div class="border-2 border-accent-blue/30 rounded-lg p-4 bg-accent-blue/5">
              <h4 class="font-semibold mb-3 text-accent-blue-dark">Periodo 1</h4>
              <div class="space-y-3">
                <div>
                  <label class="label">Data Inizio</label>
                  <input v-model="period1.start" type="date" class="input-field" />
                </div>
                <div>
                  <label class="label">Data Fine</label>
                  <input v-model="period1.end" type="date" class="input-field" />
                </div>
              </div>
            </div>

            <!-- Period 2 -->
            <div class="border-2 border-success-light/30 rounded-lg p-4 bg-success-light/5">
              <h4 class="font-semibold mb-3 text-success-dark">Periodo 2</h4>
              <div class="space-y-3">
                <div>
                  <label class="label">Data Inizio</label>
                  <input v-model="period2.start" type="date" class="input-field" />
                </div>
                <div>
                  <label class="label">Data Fine</label>
                  <input v-model="period2.end" type="date" class="input-field" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-4 mt-6">
            <button @click="loadComparison" class="btn-primary">
              Confronta Periodi
            </button>
            <button @click="exportToExcel" class="btn-secondary flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Esporta Excel
            </button>
            <button @click="exportToPDF" class="btn-secondary flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Esporta PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="spinner"></div>
      </div>

      <!-- Comparison Results -->
      <div v-else-if="stats1 && stats2" class="space-y-6">
        <!-- Summary Comparison Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Saldo</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-accent-blue font-medium">Periodo 1:</span>
                <span class="font-bold text-xl text-primary-dark">€ {{ formatNumber(stats1.balance) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-success font-medium">Periodo 2:</span>
                <span class="font-bold text-xl text-primary-dark">€ {{ formatNumber(stats2.balance) }}</span>
              </div>
              <div class="border-t border-neutral-200 pt-2 flex justify-between items-center">
                <span class="text-neutral-600">Differenza:</span>
                <span class="font-bold text-xl" :class="getDifferenceClass(stats2.balance - stats1.balance)">
                  {{ formatDifference(stats2.balance - stats1.balance) }}
                </span>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Entrate</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-accent-blue font-medium">Periodo 1:</span>
                <span class="font-bold text-xl text-primary-dark">€ {{ formatNumber(stats1.total_income) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-success font-medium">Periodo 2:</span>
                <span class="font-bold text-xl text-primary-dark">€ {{ formatNumber(stats2.total_income) }}</span>
              </div>
              <div class="border-t border-neutral-200 pt-2 flex justify-between items-center">
                <span class="text-neutral-600">Differenza:</span>
                <span class="font-bold text-xl" :class="getDifferenceClass(stats2.total_income - stats1.total_income)">
                  {{ formatDifference(stats2.total_income - stats1.total_income) }}
                </span>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Spese</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-accent-blue font-medium">Periodo 1:</span>
                <span class="font-bold text-xl text-primary-dark">€ {{ formatNumber(stats1.total_expense) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-success font-medium">Periodo 2:</span>
                <span class="font-bold text-xl text-primary-dark">€ {{ formatNumber(stats2.total_expense) }}</span>
              </div>
              <div class="border-t border-neutral-200 pt-2 flex justify-between items-center">
                <span class="text-neutral-600">Differenza:</span>
                <span class="font-bold text-xl" :class="getDifferenceClass(stats1.total_expense - stats2.total_expense)">
                  {{ formatDifference(stats2.total_expense - stats1.total_expense) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Comparison -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card">
            <h3 class="text-2xl font-bold mb-6 text-accent-blue">Periodo 1</h3>
            <div class="chart-container" style="height: 350px;">
              <canvas ref="chart1"></canvas>
            </div>
          </div>

          <div class="card">
            <h3 class="text-2xl font-bold mb-6 text-success">Periodo 2</h3>
            <div class="chart-container" style="height: 350px;">
              <canvas ref="chart2"></canvas>
            </div>
          </div>
        </div>

        <!-- Combined Chart -->
        <div class="card">
          <h3 class="text-2xl font-bold mb-6 text-primary-dark">Confronto Entrate vs Spese</h3>
          <div class="chart-container" style="height: 400px;">
            <canvas ref="combinedChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Export Preview (hidden, used for PDF generation) -->
      <div id="export-content" style="display: none;">
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #1E3A5F; margin-bottom: 20px;">Report Finanziario - Confronto Periodi</h1>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #333; margin-bottom: 10px;">Periodo 1: {{ period1.start }} - {{ period1.end }}</h2>
            <h2 style="color: #333; margin-bottom: 10px;">Periodo 2: {{ period2.start }} - {{ period2.end }}</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #1E3A5F; color: white;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Metrica</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Periodo 1</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Periodo 2</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Differenza</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Saldo</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">€ {{ formatNumber(stats1?.balance || 0) }}</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">€ {{ formatNumber(stats2?.balance || 0) }}</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">{{ formatDifference((stats2?.balance || 0) - (stats1?.balance || 0)) }}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Entrate</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">€ {{ formatNumber(stats1?.total_income || 0) }}</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">€ {{ formatNumber(stats2?.total_income || 0) }}</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">{{ formatDifference((stats2?.total_income || 0) - (stats1?.total_income || 0)) }}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Spese</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">€ {{ formatNumber(stats1?.total_expense || 0) }}</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">€ {{ formatNumber(stats2?.total_expense || 0) }}</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">{{ formatDifference((stats2?.total_expense || 0) - (stats1?.total_expense || 0)) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useTransactionsStore } from '../stores/transactions'
import { Chart, registerables } from 'chart.js'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

Chart.register(...registerables)

const transactionsStore = useTransactionsStore()

const loading = ref(false)
const stats1 = ref(null)
const stats2 = ref(null)

const period1 = ref({
  start: '',
  end: ''
})

const period2 = ref({
  start: '',
  end: ''
})

const chart1 = ref(null)
const chart2 = ref(null)
const combinedChart = ref(null)

let chartInstance1 = null
let chartInstance2 = null
let combinedChartInstance = null

const formatNumber = (value) => {
  return parseFloat(value).toFixed(2)
}

const formatDifference = (value) => {
  const sign = value >= 0 ? '+' : ''
  return `${sign}€ ${formatNumber(Math.abs(value))}`
}

const getDifferenceClass = (value) => {
  return value >= 0 ? 'text-success' : 'text-error'
}

const loadComparison = async () => {
  if (!period1.value.start || !period1.value.end || !period2.value.start || !period2.value.end) {
    alert('Seleziona entrambi i periodi')
    return
  }

  loading.value = true
  try {
    // Load stats for period 1
    await transactionsStore.fetchStatistics({
      start_date: period1.value.start,
      end_date: period1.value.end
    })
    stats1.value = { ...transactionsStore.statistics }

    // Load stats for period 2
    await transactionsStore.fetchStatistics({
      start_date: period2.value.start,
      end_date: period2.value.end
    })
    stats2.value = { ...transactionsStore.statistics }

    await nextTick()
    renderCharts()
  } catch (error) {
    console.error('Error loading comparison:', error)
    alert('Errore durante il caricamento dei dati')
  } finally {
    loading.value = false
  }
}

const renderCharts = () => {
  if (!stats1.value || !stats2.value) return

  // Destroy existing charts
  if (chartInstance1) chartInstance1.destroy()
  if (chartInstance2) chartInstance2.destroy()
  if (combinedChartInstance) combinedChartInstance.destroy()

  // Chart 1
  if (chart1.value && stats1.value.expenses_by_category.length > 0) {
    chartInstance1 = new Chart(chart1.value, {
      type: 'doughnut',
      data: {
        labels: stats1.value.expenses_by_category.map(c => c.name || 'Altro'),
        datasets: [{
          data: stats1.value.expenses_by_category.map(c => c.total),
          backgroundColor: ['#2563EB', '#059669', '#DC2626', '#64748B', '#7C3AED', '#EA580C', '#0891B2', '#BE185D']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Spese per Categoria' }
        }
      }
    })
  }

  // Chart 2
  if (chart2.value && stats2.value.expenses_by_category.length > 0) {
    chartInstance2 = new Chart(chart2.value, {
      type: 'doughnut',
      data: {
        labels: stats2.value.expenses_by_category.map(c => c.name || 'Altro'),
        datasets: [{
          data: stats2.value.expenses_by_category.map(c => c.total),
          backgroundColor: ['#2563EB', '#059669', '#DC2626', '#64748B', '#7C3AED', '#EA580C', '#0891B2', '#BE185D']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Spese per Categoria' }
        }
      }
    })
  }

  // Combined Chart
  if (combinedChart.value) {
    combinedChartInstance = new Chart(combinedChart.value, {
      type: 'bar',
      data: {
        labels: ['Entrate', 'Spese'],
        datasets: [
          {
            label: 'Periodo 1',
            data: [stats1.value.total_income, stats1.value.total_expense],
            backgroundColor: '#2563EB'
          },
          {
            label: 'Periodo 2',
            data: [stats2.value.total_income, stats2.value.total_expense],
            backgroundColor: '#059669'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    })
  }
}

const exportToExcel = async () => {
  if (!stats1.value || !stats2.value) {
    alert('Carica prima i dati da confrontare')
    return
  }

  try {
    const wb = XLSX.utils.book_new()

    // Summary sheet
    const summaryData = [
      ['Report Finanziario - Confronto Periodi'],
      [],
      ['Periodo 1:', `${period1.value.start} - ${period1.value.end}`],
      ['Periodo 2:', `${period2.value.start} - ${period2.value.end}`],
      [],
      ['Metrica', 'Periodo 1', 'Periodo 2', 'Differenza'],
      ['Saldo', stats1.value.balance, stats2.value.balance, stats2.value.balance - stats1.value.balance],
      ['Entrate', stats1.value.total_income, stats2.value.total_income, stats2.value.total_income - stats1.value.total_income],
      ['Spese', stats1.value.total_expense, stats2.value.total_expense, stats2.value.total_expense - stats1.value.total_expense]
    ]

    const ws = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(wb, ws, 'Riepilogo')

    // Export
    XLSX.writeFile(wb, `confronto-finanze-${Date.now()}.xlsx`)
  } catch (error) {
    console.error('Error exporting to Excel:', error)
    alert('Errore durante l\'esportazione Excel')
  }
}

const exportToPDF = async () => {
  if (!stats1.value || !stats2.value) {
    alert('Carica prima i dati da confrontare')
    return
  }

  try {
    const element = document.getElementById('export-content')
    element.style.display = 'block'

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false
    })

    element.style.display = 'none'

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const imgWidth = 190
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)
    pdf.save(`confronto-finanze-${Date.now()}.pdf`)
  } catch (error) {
    console.error('Error exporting to PDF:', error)
    alert('Errore durante l\'esportazione PDF')
  }
}
</script>
