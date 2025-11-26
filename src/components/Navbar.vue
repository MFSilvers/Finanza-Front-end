<template>
  <nav class="bg-primary-dark text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/dashboard" class="text-xl font-bold hover:text-gray-300 transition">
            💰 Finanze
          </router-link>
          <div class="hidden md:flex space-x-4">
            <router-link 
              to="/dashboard" 
              class="hover:text-gray-300 transition px-3 py-2 rounded"
              :class="{ 'bg-primary-navy': $route.name === 'Dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/transactions" 
              class="hover:text-gray-300 transition px-3 py-2 rounded"
              :class="{ 'bg-primary-navy': $route.name === 'Transactions' }"
            >
              Transazioni
            </router-link>
            <router-link 
              to="/comparison" 
              class="hover:text-gray-300 transition px-3 py-2 rounded"
              :class="{ 'bg-primary-navy': $route.name === 'Comparison' }"
            >
              Confronto
            </router-link>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <span class="hidden md:inline text-sm">{{ user?.name }}</span>
          <button @click="handleLogout" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition">
            Esci
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.currentUser)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
