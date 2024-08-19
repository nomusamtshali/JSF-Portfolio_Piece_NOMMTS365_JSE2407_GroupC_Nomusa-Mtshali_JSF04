<script setup>
import { useStore } from '../store';

const props = defineProps({
  product: Object,
});

const store = useStore();

function addToCart() {
  store.addToCart(props.product);
}

function addToComparison() {
  store.addToComparison(props.product);
}
</script>

<template>
  <div class="product-card border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-800">
    <div class="relative mb-4">
      <img :src="product.image" :alt="product.title" class="product-image w-full object-contain p-2" />
      <div class="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-3 py-1 shadow-md">
        <p class="text-sm text-gray-800 dark:text-gray-200 font-semibold">${{ product.price }}</p>
      </div>
    </div>
    <div class="px-4 pb-4">
      <h2 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">{{ product.title }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ product.category }}</p>
      <router-link 
        :to="`/product/${product.id}`" 
        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 font-semibold underline transition-colors duration-200 ease-in-out">
        View Details
      </router-link>
      <div class="mt-4 flex justify-between space-x-2">
        <button 
          @click="addToCart" 
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 ease-in-out">
          Add to Cart
        </button>
        <button 
          @click="addToComparison" 
          class="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 active:bg-yellow-700 transition-all duration-200 ease-in-out">
          Compare
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.product-card {
  max-width: 18rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-image {
  height: 10rem; /* Adjust height as needed for your design */
}

@media (min-width: 640px) {
  .product-card {
    max-width: 16rem;
  }
}

@media (min-width: 1024px) {
  .product-card {
    max-width: 18rem;
  }
}
</style>
