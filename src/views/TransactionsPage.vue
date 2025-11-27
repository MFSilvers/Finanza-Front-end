<template>
  <div class="transactions-page min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-dark py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">Transazioni</h1>
        
        <!-- Add Transaction Button -->
        <button @click="openAddModal" class="btn-primary mb-6">
          + Nuova Transazione
        </button>

        <!-- Filters -->
        <div class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Tipo</label>
              <select v-model="filters.type" class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white">
                <option value="" class="bg-neutral-800">Tutti</option>
                <option value="income" class="bg-neutral-800">Entrate</option>
                <option value="expense" class="bg-neutral-800">Spese</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Categoria</label>
              <select v-model="filters.category_id" class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white">
                <option value="" class="bg-neutral-800">Tutte</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id" class="bg-neutral-800">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Data Inizio</label>
              <input v-model="filters.start_date" type="date" class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Data Fine</label>
              <input v-model="filters.end_date" type="date" class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white" />
            </div>
          </div>
          <div class="flex gap-4 mt-4">
            <button @click="applyFilters" class="btn-primary">Applica Filtri</button>
            <button @click="clearFilters" class="btn-secondary">Reset</button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="spinner"></div>
      </div>

      <!-- Transactions List -->
      <div v-else class="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-lg p-6 shadow-xl">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-neutral-700">
                <th class="text-left py-3 px-4 text-neutral-300 font-semibold">Data</th>
                <th class="text-left py-3 px-4 text-neutral-300 font-semibold">Tipo</th>
                <th class="text-left py-3 px-4 text-neutral-300 font-semibold">Categoria</th>
                <th class="text-left py-3 px-4 text-neutral-300 font-semibold">Descrizione</th>
                <th class="text-left py-3 px-4 text-neutral-300 font-semibold">Ricorrenza</th>
                <th class="text-right py-3 px-4 text-neutral-300 font-semibold">Importo</th>
                <th class="text-center py-3 px-4 text-neutral-300 font-semibold">Azioni</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="transaction in transactions" 
                :key="transaction.id"
                class="border-b border-neutral-700 hover:bg-neutral-700/30 transition"
              >
                <td class="py-3 px-4 text-neutral-300">{{ formatDate(transaction.date) }}</td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2 py-1 rounded text-sm font-semibold"
                    :class="transaction.type === 'income' ? 'bg-success-light/20 text-success-light' : 'bg-error-light/20 text-error-light'"
                  >
                    {{ transaction.type === 'income' ? 'Entrata' : 'Spesa' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-neutral-300">{{ transaction.category_name || 'Altro' }}</td>
                <td class="py-3 px-4 text-neutral-300">{{ transaction.description || '-' }}</td>
                <td class="py-3 px-4">
                  <span class="text-sm text-neutral-400">
                    {{ getRecurringLabel(transaction.recurring_rule) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right font-bold" :class="transaction.type === 'income' ? 'text-success-light' : 'text-error-light'">
                  {{ transaction.type === 'income' ? '+' : '-' }}€ {{ formatNumber(transaction.amount) }}
                </td>
                <td class="py-3 px-4">
                  <div class="flex justify-center gap-2">
                    <button @click="openEditModal(transaction)" class="text-accent-blue hover:text-accent-blue-dark p-1.5 rounded hover:bg-accent-blue/10 transition-colors" title="Modifica">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="deleteTransaction(transaction.id)" class="text-error hover:text-error-dark p-1.5 rounded hover:bg-error-light/10 transition-colors" title="Elimina">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="flex justify-center gap-2 mt-6">
          <button 
            v-for="page in pagination.pages" 
            :key="page"
            @click="goToPage(page)"
            class="px-4 py-2 rounded"
            :class="page === pagination.page ? 'bg-accent-blue text-white' : 'bg-neutral-700/50 hover:bg-neutral-700 text-neutral-300 border border-neutral-600'"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white">
            {{ editingTransaction ? 'Modifica Transazione' : 'Nuova Transazione' }}
          </h2>
          <button @click="closeModal" class="text-neutral-500 hover:text-neutral-700 transition-colors" title="Chiudi">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveTransaction" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Tipo *</label>
              <select v-model="formData.type" required class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white">
                <option value="income" class="bg-neutral-800">Entrata</option>
                <option value="expense" class="bg-neutral-800">Spesa</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Importo * (€)</label>
              <input 
                v-model.number="formData.amount" 
                type="number" 
                step="0.01" 
                required 
                class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white placeholder-neutral-400"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Data *</label>
              <input 
                v-model="formData.date" 
                type="date" 
                required 
                class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Categoria</label>
              <select v-model="formData.category_id" class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white">
                <option value="" class="bg-neutral-800">Nessuna</option>
                <option 
                  v-for="cat in filteredCategories" 
                  :key="cat.id" 
                  :value="cat.id"
                  class="bg-neutral-800"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Ricorrenza</label>
              <select v-model="formData.recurring_rule" class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white">
                <option value="single" class="bg-neutral-800">Singola</option>
                <option value="daily" class="bg-neutral-800">Giornaliera</option>
                <option value="weekly" class="bg-neutral-800">Settimanale</option>
                <option value="monthly" class="bg-neutral-800">Mensile</option>
                <option value="yearly" class="bg-neutral-800">Annuale</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Valuta</label>
              <input 
                v-model="formData.currency" 
                type="text" 
                class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white placeholder-neutral-400"
                placeholder="EUR"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">Descrizione</label>
            <textarea 
              v-model="formData.description" 
              class="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all text-white placeholder-neutral-400"
              rows="3"
              placeholder="Descrizione opzionale..."
            ></textarea>
          </div>

          <div class="flex gap-4 justify-end">
            <button type="button" @click="closeModal" class="btn-secondary">
              Annulla
            </button>
            <button type="submit" class="btn-primary" :disabled="saving">
              {{ saving ? 'Salvataggio...' : 'Salva' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTransactionsStore } from '../stores/transactions'

const transactionsStore = useTransactionsStore()

const loading = ref(true)
const saving = ref(false)
const showModal = ref(false)
const editingTransaction = ref(null)

const filters = ref({
  type: '',
  category_id: '',
  start_date: '',
  end_date: '',
  page: 1
})

const formData = ref({
  type: 'expense',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  category_id: '',
  recurring_rule: 'single',
  currency: 'EUR',
  description: ''
})

const transactions = computed(() => transactionsStore.transactions)
const categories = computed(() => transactionsStore.categories)
const pagination = computed(() => transactionsStore.pagination)

const filteredCategories = computed(() => {
  return categories.value.filter(c => c.type === formData.value.type)
})

const formatNumber = (value) => {
  return parseFloat(value).toFixed(2)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('it-IT')
}

const getRecurringLabel = (rule) => {
  const labels = {
    single: 'Singola',
    daily: 'Giornaliera',
    weekly: 'Settimanale',
    monthly: 'Mensile',
    yearly: 'Annuale'
  }
  return labels[rule] || rule
}

const loadData = async () => {
  loading.value = true
  try {
    await transactionsStore.fetchCategories()
    await transactionsStore.fetchTransactions(filters.value)
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  filters.value.page = 1
  loadData()
}

const clearFilters = () => {
  filters.value = {
    type: '',
    category_id: '',
    start_date: '',
    end_date: '',
    page: 1
  }
  loadData()
}

const goToPage = (page) => {
  filters.value.page = page
  loadData()
}

const openAddModal = () => {
  editingTransaction.value = null
  formData.value = {
    type: 'expense',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category_id: '',
    recurring_rule: 'single',
    currency: 'EUR',
    description: ''
  }
  showModal.value = true
}

const openEditModal = (transaction) => {
  editingTransaction.value = transaction
  formData.value = {
    type: transaction.type,
    amount: transaction.amount,
    date: transaction.date,
    category_id: transaction.category_id || '',
    recurring_rule: transaction.recurring_rule,
    currency: transaction.currency,
    description: transaction.description || ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingTransaction.value = null
}

const saveTransaction = async () => {
  saving.value = true
  try {
    const data = {
      ...formData.value,
      category_id: formData.value.category_id || null
    }

    if (editingTransaction.value) {
      await transactionsStore.updateTransaction(editingTransaction.value.id, data)
    } else {
      await transactionsStore.createTransaction(data)
    }

    closeModal()
    await loadData()
  } catch (error) {
    console.error('Error saving transaction:', error)
    alert('Errore durante il salvataggio')
  } finally {
    saving.value = false
  }
}

const deleteTransaction = async (id) => {
  if (!confirm('Sei sicuro di voler eliminare questa transazione?')) {
    return
  }

  try {
    await transactionsStore.deleteTransaction(id)
    await loadData()
  } catch (error) {
    console.error('Error deleting transaction:', error)
    alert('Errore durante l\'eliminazione')
  }
}

onMounted(() => {
  loadData()
})
</script>
