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

const mobileMenuOpen = ref(false);
const dropdownOpen = ref(false);

const linkClass = computed(
  () =>
    "text-navbar-text-color hover:text-link-color dark:hover:text-link-color-dark flex items-center"
);

const isAuthenticated = computed(() => !!store.jwt);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

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
  <nav class="bg-navbar-bg-color p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <img src="/The DE.png" class="h-8 sm:h-12" alt="Digital Emporium Logo" />
        <router-link to="/" class="text-xl font-bold" :class="linkClass">
          The Digital Emporium
        </router-link>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-8">
        <router-link to="/comparison" class="text-md font-bold" :class="linkClass">
          Comparison
        </router-link>
        <router-link to="/cart" class="text-md font-bold relative flex items-center" :class="linkClass">
          <svg class="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Cart
          <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {{ cartItemCount }}
          </span>
        </router-link>
        <div class="relative">
          <button @click="toggleDropdown" class="text-md font-bold flex items-center" :class="linkClass">
            Account
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-xl z-10"
          >
            <router-link
              v-if="isAuthenticated"
              to="/"
              @click.native="logout"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              Logout
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H12M12 12L15 15M12 12L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </router-link>
            <router-link
              v-else
              to="/login"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              Login
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="scale(-1, 1)">
                <path d="M19 12H12M12 12L15 15M12 12L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </router-link>
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
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-navbar-text-color focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-4">
      <router-link to="/comparison" class="block text-md font-bold" :class="linkClass">
        Comparison
      </router-link>
      <router-link to="/cart" class="block text-md font-bold relative flex items-center" :class="linkClass">
        <svg class="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Cart
        <span v-if="cartItemCount > 0" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {{ cartItemCount }}
        </span>
      </router-link>
      <div>
        <button @click="toggleDropdown" class="text-md font-bold flex items-center" :class="linkClass">
          Account
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div
          v-if="dropdownOpen"
          class="mt-2 py-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-xl"
        >
          <router-link
            v-if="isAuthenticated"
            to="/"
            @click.native="logout"
            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            Logout
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H12M12 12L15 15M12 12L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <router-link
            v-else
            to="/login"
            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            Login
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="scale(-1, 1)">
              <path d="M19 12H12M12 12L15 15M12 12L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>
      <button @click="toggleTheme" class="focus:outline-none flex items-center" :class="linkClass">
        <span class="mr-2 block text-md font-bold">Theme:</span>
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
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
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
