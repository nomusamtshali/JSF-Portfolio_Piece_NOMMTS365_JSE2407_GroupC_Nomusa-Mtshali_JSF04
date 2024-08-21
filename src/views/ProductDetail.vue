<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../store";

const store = useStore();
const route = useRoute();
const product = ref(null);
const loading = ref(true);

onMounted(async () => {
  const productId = route.params.id;
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await response.json();
    product.value = data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
  } finally {
    loading.value = false;
  }
});

const addToCart = () => {
  store.addToCart(product.value);
}
</script>

<template>
  <div class="container mx-auto py-6">
    <button @click="$router.go(-1)" class="bg-orange-500 text-white dark:text-gray-900 rounded-md py-2 px-4 mb-4">
      Back
    </button>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="flex flex-col md:flex-row gap-6">
      <div class="skeleton-loader w-full md:w-1/2 h-80 rounded-md"></div>
      <div class="flex-1 space-y-4">
        <div class="skeleton-loader h-8 w-3/4 rounded-md"></div>
        <div class="skeleton-loader h-6 w-1/2 rounded-md"></div>
        <div class="skeleton-loader h-6 w-1/4 rounded-md"></div>
        <div class="skeleton-loader h-20 w-full rounded-md"></div>
        <div class="skeleton-loader h-10 w-1/3 rounded-md"></div>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else class="flex flex-col md:flex-row gap-6">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full md:w-1/2 h-80 object-contain rounded-md shadow-lg"
      />
      <div class="flex-1">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {{ product.title }}
        </h1>
        <p class="text-lg text-teal-500 font-semibold mb-2">
          Category: {{ product.category }}
        </p>
        <div class="flex items-center mb-4">
          <span class="text-yellow-500 text-xl mr-2">{{ product.rating.rate }} ☆</span>
          <span class="text-gray-500 dark:text-gray-400">({{ product.rating.count }} reviews)</span>
        </div>
        <p class="text-3xl font-bold text-teal-600 mb-4">${{ product.price }}</p>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">{{ product.description }}</p>
        <button
          @click="addToCart"
          class="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md text-lg transition-all duration-200 ease-in-out shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-loader {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.container {
  max-width: 1200px;
}
</style>
