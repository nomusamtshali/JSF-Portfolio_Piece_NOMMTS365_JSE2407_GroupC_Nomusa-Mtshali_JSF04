<script setup>
import { computed } from 'vue';
import { useStore } from './store';
import Navbar from './components/Navbar.vue';
import Notification from './components/Notification.vue';

const store = useStore();

const cartItemCount = computed(() => {
  return store.cart.reduce((count, item) => count + item.quantity, 0);
});
</script>

<template>
  <div :class="themeClass">
    <Navbar :cartItemCount="cartItemCount"/> 
    <main class="container mx-auto py-6">
      <Notification />
      <router-view />
    </main>
  </div>
</template>


<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
