import { defineStore } from 'pinia'
import api from '../services/api'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    categories: [],
    statistics: null,
    loading: false,
    error: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 50,
      pages: 0
    }
  }),

  getters: {
    incomeCategories: (state) => state.categories.filter(c => c.type === 'income'),
    expenseCategories: (state) => state.categories.filter(c => c.type === 'expense')
  },

  actions: {
    async fetchTransactions(filters = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/transactions', { params: filters })
        const storeTime = performance.now()
        const timeFromResponse = response._responseTime ? (storeTime - response._responseTime).toFixed(2) : 'N/A'
        console.log(`📦 [transactions] Dati assegnati allo store:`, storeTime.toFixed(2), 'ms', `(+${timeFromResponse} ms dalla risposta)`)
        this.transactions = response.data.transactions
        this.pagination = response.data.pagination
        response._storeTime = storeTime
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to fetch transactions'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTransaction(transactionData) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/transactions', transactionData)
        await this.fetchTransactions()
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create transaction'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTransaction(id, transactionData) {
      this.loading = true
      this.error = null
      try {
        const response = await api.put(`/transactions/${id}`, transactionData)
        await this.fetchTransactions()
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update transaction'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTransaction(id) {
      this.loading = true
      this.error = null
      try {
        const response = await api.delete(`/transactions/${id}`)
        await this.fetchTransactions()
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to delete transaction'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const response = await api.get('/categories')
        const storeTime = performance.now()
        const timeFromResponse = response._responseTime ? (storeTime - response._responseTime).toFixed(2) : 'N/A'
        console.log(`📦 [categories] Dati assegnati allo store:`, storeTime.toFixed(2), 'ms', `(+${timeFromResponse} ms dalla risposta)`)
        this.categories = response.data.categories
        response._storeTime = storeTime
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to fetch categories'
        throw error
      }
    },

    async fetchStatistics(filters = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/statistics', { params: filters })
        const storeTime = performance.now()
        const timeFromResponse = response._responseTime ? (storeTime - response._responseTime).toFixed(2) : 'N/A'
        console.log(`📦 [statistics] Dati assegnati allo store:`, storeTime.toFixed(2), 'ms', `(+${timeFromResponse} ms dalla risposta)`)
        this.statistics = response.data
        response._storeTime = storeTime
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to fetch statistics'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
