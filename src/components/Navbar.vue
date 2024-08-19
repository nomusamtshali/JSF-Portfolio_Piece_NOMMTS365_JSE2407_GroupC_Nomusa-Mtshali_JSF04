<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

const props = defineProps({
  cartItemCount: {
    type: Number,
    required: true,
  },
  isDarkMode: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["toggleTheme"]);

const router = useRouter();
const store = useStore();

const dropdownOpen = ref(false);

const linkClass = computed(
  () =>
    "text-navbar-text-color hover:text-link-color dark:hover:text-link-color-dark"
);

const isAuthenticated = computed(() => !!store.jwt);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const toggleTheme = () => {
  emit("toggleTheme");
};

const logout = () => {
  store.logout();
  router.push("/");
};
</script>

<template>
  <nav
    class="bg-navbar-bg-color p-4 flex justify-between items-center shadow-md"
  >
    <div class="flex items-center space-x-4">
     <img src="/The DE.png" class="h-12" alt="Digital Emporium Logo" /> 
      <router-link to="/" class="text-xl font-bold" :class="linkClass">
        The Digital Emporium
        </router-link
      >
    </div>
    <div class="flex items-center space-x-14">
      <router-link to="/comparison" class="text-sm" :class="linkClass"
        >Comparison</router-link
      >

      <router-link to="/cart" class="relative text-sm" :class="linkClass">
        Cart
        <font-awesome-icon :icon="faCartShopping" />
        <i class="fa-solid fa-cart-shopping"></i>
        <span
          v-if="cartItemCount > 0"
          class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
        >
          {{ cartItemCount }}
        </span>
      </router-link>
      <div class="relative">
        <button @click="toggleDropdown" class="text-sm" :class="linkClass">
          Account
        </button>
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-xl"
        >
          <router-link
            v-if="isAuthenticated"
            to="/"
            @click.native="logout"
            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >Logout</router-link
          >
          <router-link
            v-else
            to="/login"
            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >Login</router-link
          >
        </div>
      </div>
      <button @click="toggleTheme" class="focus:outline-none">
        <svg
          v-if="isDarkMode"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-yellow-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m8.364-11.636l-.707-.707m-12.728 0l-.707.707M21 12h-1M4 12H3m15.364 7.364l-.707.707m-12.728 0l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-800 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m8.364-11.636l-.707-.707m-12.728 0l-.707.707M21 12h-1M4 12H3m15.364 7.364l-.707.707m-12.728 0l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.bg-navbar-bg-color {
  background-color: var(--navbar-bg-color);
}

.text-navbar-text-color {
  color: var(--text-color);
}

.hover\:text-link-color:hover {
  color: var(--link-color);
}

.dark\:hover\:text-link-color-dark:hover {
  color: var(--link-color-dark);
}
</style>
