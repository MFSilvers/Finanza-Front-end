<template>
  <nav class="bg-neutral-900 border-b border-neutral-700 text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-4 md:space-x-8">
          <router-link to="/dashboard" class="text-lg md:text-xl font-bold text-white hover:text-secondary transition-all">
            Finanze
          </router-link>
          <div class="hidden md:flex space-x-1">
            <router-link 
              to="/dashboard" 
              class="hover:bg-neutral-700/50 transition-all px-3 py-2 rounded-lg text-sm font-medium"
              :class="{ 'bg-neutral-700/50 text-secondary': $route.name === 'Dashboard', 'text-neutral-300': $route.name !== 'Dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/transactions" 
              class="hover:bg-neutral-700/50 transition-all px-3 py-2 rounded-lg text-sm font-medium"
              :class="{ 'bg-neutral-700/50 text-secondary': $route.name === 'Transactions', 'text-neutral-300': $route.name !== 'Transactions' }"
            >
              Transazioni
            </router-link>
            <router-link 
              to="/comparison" 
              class="hover:bg-neutral-700/50 transition-all px-3 py-2 rounded-lg text-sm font-medium"
              :class="{ 'bg-neutral-700/50 text-secondary': $route.name === 'Comparison', 'text-neutral-300': $route.name !== 'Comparison' }"
            >
              Confronto
            </router-link>
          </div>
        </div>
        <div class="flex items-center space-x-2 md:space-x-4">
          <span class="hidden lg:inline text-sm text-neutral-300">{{ user?.name }}</span>
          <button @click="handleLogout" class="bg-error hover:bg-error-dark text-white px-3 md:px-4 py-2 rounded-lg transition-all text-xs md:text-sm font-medium">
            <span class="hidden sm:inline">Esci</span>
            <span class="sm:hidden">X</span>
          </button>
          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="md:hidden p-2 rounded-lg hover:bg-neutral-700/50 transition-all"
            aria-label="Menu"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-neutral-700 py-4 animate-slide-down">
        <div class="flex flex-col space-y-2">
          <router-link 
            to="/dashboard" 
            @click="mobileMenuOpen = false"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="{ 'bg-neutral-700/50 text-secondary': $route.name === 'Dashboard', 'text-neutral-300 hover:bg-neutral-700/30': $route.name !== 'Dashboard' }"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/transactions" 
            @click="mobileMenuOpen = false"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="{ 'bg-neutral-700/50 text-secondary': $route.name === 'Transactions', 'text-neutral-300 hover:bg-neutral-700/30': $route.name !== 'Transactions' }"
          >
            Transazioni
          </router-link>
          <router-link 
            to="/comparison" 
            @click="mobileMenuOpen = false"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="{ 'bg-neutral-700/50 text-secondary': $route.name === 'Comparison', 'text-neutral-300 hover:bg-neutral-700/30': $route.name !== 'Comparison' }"
          >
            Confronto
          </router-link>
          <div class="px-4 py-2 text-sm text-neutral-300 border-t border-neutral-700 mt-2 pt-2">
            {{ user?.name }}
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

const user = computed(() => authStore.currentUser)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
