<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

/**
 * @type {import('vue').Ref<string>}
 */
const username = ref("");

/**
 * @type {import('vue').Ref<string>}
 */
const password = ref("");

/**
 * @type {import('vue').Ref<boolean>}
 */
const loading = ref(false);

/**
 * @type {import('vue').Ref<string>}
 */
const errorMessage = ref("");

/**
 * @type {import('vue').Ref<boolean>}
 */
const passwordVisible = ref(false);

/**
 * Store instance from Pinia
 * @type {import('pinia').Store}
 */
const store = useStore();

/**
 * Vue Router instance
 * @type {import('vue-router').Router}
 */
const router = useRouter();

/**
 * Handles the login process
 */
const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = "Username and password are required.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  const success = await store.login(username.value, password.value);
  
  if (success) {
    router.push("/");  // Redirect to home page
  } else {
    errorMessage.value = "Login failed. Please check your credentials.";
  }

  loading.value = false;
};

/**
 * Toggles password visibility
 */
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<template>
  <button @click="$router.go(-1)" class="bg-teal-500 text-white rounded-md py-2 px-4 mb-4">
    Back
  </button>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
    <h1 class="text-2xl font-bold mb-6">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block text-gray-700">Username:</label>
        <input
          v-model="username"
          type="text"
          class="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Password:</label>
        <div class="relative">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password"
            class="w-full p-2 border rounded-md"
            required
          />
          <button
            @click.prevent="togglePasswordVisibility"
            type="button"
            class="absolute right-2 top-2 text-gray-500"
          >
            {{ passwordVisible ? "Hide" : "Show" }}
          </button>
        </div>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="bg-orange-500 text-white py-2 px-4 rounded-md w-full"
          :disabled="loading"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </div>
      <p v-if="errorMessage" class="mt-4 font-semibold text-red-500">{{ errorMessage }}</p>
    </form>
  </div>
</template>
