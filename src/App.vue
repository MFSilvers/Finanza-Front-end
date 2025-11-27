<template>
  <div id="app" class="min-h-screen">
    <Navbar v-if="showNavbar" />
    <main :class="{ 'pt-14 md:pt-16': showNavbar }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const showNavbar = computed(() => {
  return !['Landing', 'Login', 'Register'].includes(route.name)
})
</script>

<style>
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
