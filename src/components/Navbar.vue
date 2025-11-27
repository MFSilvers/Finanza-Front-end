<template>
  <nav class="bg-white border-b border-neutral-200 text-neutral-800 fixed top-0 left-0 right-0 z-50 shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/dashboard" class="text-xl font-bold text-primary-dark hover:text-accent-blue transition-colors">
            Finanze
          </router-link>
          <div class="hidden md:flex space-x-1">
            <router-link 
              to="/dashboard" 
              class="hover:bg-neutral-100 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'bg-neutral-100 text-accent-blue': $route.name === 'Dashboard', 'text-neutral-700': $route.name !== 'Dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/transactions" 
              class="hover:bg-neutral-100 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'bg-neutral-100 text-accent-blue': $route.name === 'Transactions', 'text-neutral-700': $route.name !== 'Transactions' }"
            >
              Transazioni
            </router-link>
            <router-link 
              to="/comparison" 
              class="hover:bg-neutral-100 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'bg-neutral-100 text-accent-blue': $route.name === 'Comparison', 'text-neutral-700': $route.name !== 'Comparison' }"
            >
              Confronto
            </router-link>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <span class="hidden md:inline text-sm text-neutral-600">{{ user?.name }}</span>
          <button @click="handleLogout" class="bg-error-light hover:bg-error text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
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
