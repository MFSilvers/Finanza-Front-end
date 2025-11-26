<template>
  <nav class="bg-primary-dark text-white fixed top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/dashboard" class="text-xl font-bold hover:text-gray-300 transition flex items-center gap-2 group">
            <div class="w-8 h-8 rounded-lg bg-primary-navy/30 group-hover:bg-primary-navy/50 flex items-center justify-center transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>Finanze</span>
          </router-link>
          <div class="hidden md:flex space-x-1">
            <router-link 
              to="/dashboard" 
              class="hover:text-gray-300 transition-all px-4 py-2 rounded-lg font-medium"
              :class="{ 'bg-primary-navy text-white': $route.name === 'Dashboard', 'text-gray-300 hover:bg-white/10': $route.name !== 'Dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/transactions" 
              class="hover:text-gray-300 transition-all px-4 py-2 rounded-lg font-medium"
              :class="{ 'bg-primary-navy text-white': $route.name === 'Transactions', 'text-gray-300 hover:bg-white/10': $route.name !== 'Transactions' }"
            >
              Transazioni
            </router-link>
            <router-link 
              to="/comparison" 
              class="hover:text-gray-300 transition-all px-4 py-2 rounded-lg font-medium"
              :class="{ 'bg-primary-navy text-white': $route.name === 'Comparison', 'text-gray-300 hover:bg-white/10': $route.name !== 'Comparison' }"
            >
              Confronto
            </router-link>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-sm font-medium">{{ user?.name }}</span>
          </div>
          <button @click="handleLogout" class="bg-red-600/90 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md font-medium flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
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
