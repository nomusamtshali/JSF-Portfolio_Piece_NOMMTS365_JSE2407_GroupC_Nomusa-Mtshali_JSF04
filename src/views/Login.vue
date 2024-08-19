<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const passwordVisible = ref(false);

const store = useStore();
const router = useRouter();

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = "Username and password are required.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    await store.login(username.value, password.value);
    router.push("/");
  } catch (error) {
    errorMessage.value = "Login failed. Please check your credentials.";
  } finally {
    loading.value = false;
  }
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
    <h1 class="text-2xl font-bold mb-6">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block text-gray-700">Username</label>
        <input
          v-model="username"
          type="text"
          class="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Password</label>
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
          class="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          :disabled="loading"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </div>
      <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
    </form>
  </div>
</template>
