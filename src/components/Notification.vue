<script setup>
import { computed } from "vue";
import { useStore } from "../store";

/**
 * Store instance
 * @type {import('../store').default}
 */
const store = useStore();

/**
 * Computed property for notification message
 * @type {import('vue').ComputedRef<string|null>}
 */
const message = computed(() => store.notificationMessage);
</script>

<template>
  <transition name="fade">
    <div
      v-if="message"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <span class="text-white bg-red-500 px-4 py-2 rounded-md">
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
