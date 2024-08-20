<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const wishlistItems = ref([]);
const sortOption = ref('');
const filterCategory = ref('');

onMounted(() => {
  if (!store.jwt) {
    router.push('/login');
  } else {
    loadWishlist();
  }
});

const loadWishlist = () => {
  wishlistItems.value = store.getWishlist().map(item => {
    const product = store.products.find(p => p.id === item.id);
    return product ? product : item;
  });
};

const sortedAndFilteredItems = computed(() => {
  let items = wishlistItems.value;

  if (filterCategory.value) {
    items = items.filter(item => item.category === filterCategory.value);
  }

  if (sortOption.value === 'lowest') {
    items = items.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === 'highest') {
    items = items.sort((a, b) => b.price - a.price);
  }

  return items;
});

const addToCart = (product) => {
  store.addToCart(product);
};

const removeFromWishlist = (product) => {
  store.removeFromWishlist(product);
  loadWishlist();
};

const clearWishlist = () => {
  store.clearWishlist();
  loadWishlist();
};
</script>

<template>
  <div class="container mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <button @click="$router.go(-1)" class="bg-blue-500 text-white dark:text-gray-900 rounded-md py-2 px-4">
        Back
      </button>
      <div class="flex space-x-4">
        <select v-model="filterCategory" class="p-2 border rounded-md">
          <option value="">All Categories</option>
          <option v-for="category in store.categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <select v-model="sortOption" class="p-2 border rounded-md">
          <option value="">Sort by</option>
          <option value="lowest">Lowest to Highest</option>
          <option value="highest">Highest to Lowest</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in sortedAndFilteredItems" :key="item.id" class="product-card border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-800 mx-auto">
        <div class="relative mb-4">
          <img :src="item.image" :alt="item.title" class="product-image w-full object-cover p-4 rounded-t-lg" />
          <div class="absolute top-2 right-2 bg-white dark:bg-gray-800 bg-opacity-90 rounded-full p-2 shadow-md cursor-pointer" @click="removeFromWishlist(item)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 00-7.78 7.78l8.484 8.484a1 1 0 001.414 0L20.84 12.39a5.5 5.5 0 000-7.78z"/>
            </svg>
          </div>
        </div>
        <div class="px-4 pb-4">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{{ item.title }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ item.category }}</p>
          <div class="flex items-center mb-2">
            <span v-for="n in Math.round(item.rating.rate)" :key="n" class="text-yellow-500">★</span>
            <span v-for="n in 5 - Math.round(item.rating.rate)" :key="`empty-${n}`" class="text-gray-300 dark:text-gray-600">★</span>
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">({{ item.rating.count }} reviews)</span>
          </div>
          <router-link 
            :to="`/product/${item.id}`" 
            class="block text-center text-white dark:text-gray-900 bg-blue-500 dark:bg-blue-300 hover:bg-blue-600 dark:hover:bg-blue-400 font-semibold rounded-md py-2 mb-2 transition-colors duration-200 ease-in-out">
            View Details
          </router-link>
          <div class="flex justify-between space-x-2">
            <button 
              @click="addToCart(item)" 
              class="w-full bg-green-500 text-white dark:text-gray-900 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-400 transition-all duration-200 ease-in-out">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <button @click="clearWishlist" class="bg-red-500 text-white dark:text-gray-900 rounded-md py-2 px-4">
        Clear Wishlist
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  max-width: 20rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-image {
  height: 12rem;
  border-bottom: 1px solid #e5e7eb;
}
</style>
