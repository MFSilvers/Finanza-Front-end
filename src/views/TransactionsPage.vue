<template>
  <div class="transactions-page min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-primary-dark mb-4">Transazioni</h1>
        
        <!-- Add Transaction Button -->
        <button @click="openAddModal" class="btn-primary mb-6 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nuova Transazione
        </button>

        <!-- Filters -->
        <div class="card mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="label">Tipo</label>
              <select v-model="filters.type" class="input-field">
                <option value="">Tutti</option>
                <option value="income">Entrate</option>
                <option value="expense">Spese</option>
              </select>
            </div>
            <div>
              <label class="label">Categoria</label>
              <select v-model="filters.category_id" class="input-field">
                <option value="">Tutte</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="label">Data Inizio</label>
              <input v-model="filters.start_date" type="date" class="input-field" />
            </div>
            <div>
              <label class="label">Data Fine</label>
              <input v-model="filters.end_date" type="date" class="input-field" />
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
      <div v-else class="card">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4">Data</th>
                <th class="text-left py-3 px-4">Tipo</th>
                <th class="text-left py-3 px-4">Categoria</th>
                <th class="text-left py-3 px-4">Descrizione</th>
                <th class="text-left py-3 px-4">Ricorrenza</th>
                <th class="text-right py-3 px-4">Importo</th>
                <th class="text-center py-3 px-4">Azioni</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="transaction in transactions" 
                :key="transaction.id"
                class="border-b hover:bg-gray-50 transition"
              >
                <td class="py-3 px-4">{{ formatDate(transaction.date) }}</td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2 py-1 rounded text-sm font-semibold"
                    :class="transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  >
                    {{ transaction.type === 'income' ? 'Entrata' : 'Spesa' }}
                  </span>
                </td>
                <td class="py-3 px-4">{{ transaction.category_name || 'Altro' }}</td>
                <td class="py-3 px-4">{{ transaction.description || '-' }}</td>
                <td class="py-3 px-4">
                  <span class="text-sm text-gray-600">
                    {{ getRecurringLabel(transaction.recurring_rule) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right font-bold" :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'">
                  {{ transaction.type === 'income' ? '+' : '-' }}€ {{ formatNumber(transaction.amount) }}
                </td>
                <td class="py-3 px-4">
                  <div class="flex justify-center gap-3">
                    <button @click="openEditModal(transaction)" class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors" title="Modifica">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="deleteTransaction(transaction.id)" class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors" title="Elimina">
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
            :class="page === pagination.page ? 'bg-primary-navy text-white' : 'bg-gray-200 hover:bg-gray-300'"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-primary-dark">
            {{ editingTransaction ? 'Modifica Transazione' : 'Nuova Transazione' }}
          </h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveTransaction" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label">Tipo *</label>
              <select v-model="formData.type" required class="input-field">
                <option value="income">Entrata</option>
                <option value="expense">Spesa</option>
              </select>
            </div>

            <div>
              <label class="label">Importo * (€)</label>
              <input 
                v-model.number="formData.amount" 
                type="number" 
                step="0.01" 
                required 
                class="input-field"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="label">Data *</label>
              <input 
                v-model="formData.date" 
                type="date" 
                required 
                class="input-field"
              />
            </div>

            <div>
              <label class="label">Categoria</label>
              <select v-model="formData.category_id" class="input-field">
                <option value="">Nessuna</option>
                <option 
                  v-for="cat in filteredCategories" 
                  :key="cat.id" 
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="label">Ricorrenza</label>
              <select v-model="formData.recurring_rule" class="input-field">
                <option value="single">Singola</option>
                <option value="daily">Giornaliera</option>
                <option value="weekly">Settimanale</option>
                <option value="monthly">Mensile</option>
                <option value="yearly">Annuale</option>
              </select>
            </div>

            <div>
              <label class="label">Valuta</label>
              <input 
                v-model="formData.currency" 
                type="text" 
                class="input-field"
                placeholder="EUR"
              />
            </div>
          </div>

          <div>
            <label class="label">Descrizione</label>
            <textarea 
              v-model="formData.description" 
              class="input-field"
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
