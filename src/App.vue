<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from './store';
import Navbar from './components/Navbar.vue';

const store = useStore();

const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
const themeClass = computed(() => (isDarkMode.value ? 'dark' : 'light'));

const cartItemCount = computed(() => {
  return store.cart.reduce((count, item) => count + item.quantity, 0);
});

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
  } else {
    localStorage.setItem('theme', 'light');
  }
});

watch(isDarkMode, (newValue) => {
  document.documentElement.classList.toggle('dark', newValue);
});
</script>

<template>
  <div :class="themeClass">
    <Navbar :cartItemCount="cartItemCount" @toggleTheme="toggleTheme" :isDarkMode="isDarkMode" />
    <main class="container mx-auto py-6">
      <router-view />
    </main>
  </div>
</template>


<style scoped>
/* Global light/dark mode styles */
html {
  scroll-behavior: smooth;
}

.light {
  --bg-color: #ffffff;
  --text-color: #000000;
  --navbar-bg-color: #f8f9fa;
  --link-color: #007bff;
}

.dark {
  --bg-color: #1a202c;
  --text-color: #ffffff;
  --navbar-bg-color: #2d3748;
  --link-color: #63b3ed;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>
