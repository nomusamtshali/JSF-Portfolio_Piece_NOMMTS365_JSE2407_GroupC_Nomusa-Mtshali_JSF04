<script setup>
import { useStore } from '../store';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// Fetch wishlist items
const wishlistItems = computed(() => store.getWishlist());

// Filter and sort options
const filterCategory = ref('');
const sortOption = ref('');

// Fetch categories
const categories = computed(() => [...new Set(wishlistItems.value.map(item => item.category))]);

// Filter and sort wishlist items
const filteredAndSortedWishlist = computed(() => {
  let items = wishlistItems.value;

  // Filter by category
  if (filterCategory.value) {
    items = items.filter(item => item.category === filterCategory.value);
  }

  // Sort by price
  if (sortOption.value === 'price-asc') {
    items = items.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === 'price-desc') {
    items = items.sort((a, b) => b.price - a.price);
  }

  return items;
});

// Add product to cart
const addToCart = (product) => {
  store.addToCart(product);
};

// Remove product from wishlist
const removeFromWishlist = (product) => {
  store.removeFromWishlist(product);
};

// Clear wishlist
const clearWishlist = () => {
  store.clearWishlist();
};

// Redirect to login if not authenticated
onMounted(() => {
  if (!store.jwt) {
    router.push('/login');
  }
});
</script>

<template>
  <div class="container mx-auto py-6">
    <button @click="$router.go(-1)" class="bg-orange-500 text-white dark:text-gray-900 rounded-md py-2 px-4 mb-4">
      Back
    </button>
    <h1 class="text-2xl font-bold mb-4">My Wishlist:</h1>

    <!-- Filters and Sort Options -->
    <div class="mb-6 flex space-x-6"> <!-- Adjusted spacing between filter and sort -->
      <div>
        <label for="filter" class="font-semibold">Filter by Category:</label>
        <select v-model="filterCategory" id="filter" class="ml-2 p-2 border rounded-md">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div>
        <label for="sort" class="font-semibold">Sort by Price:</label>
        <select v-model="sortOption" id="sort" class="ml-2 p-2 border rounded-md">
          <option value="">Default</option>
          <option value="price-asc">Lowest to Highest</option>
          <option value="price-desc">Highest to Lowest</option>
        </select>
      </div>
    </div>

    <!-- Wishlist Items -->
    <div v-if="filteredAndSortedWishlist.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in filteredAndSortedWishlist" :key="item.id" class="product-card border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-800 mx-auto">
        <img :src="item.image" :alt="item.title" class="product-image w-full object-contain p-2" />
        <div class="px-4 pb-4">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{{ item.title }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ item.category }}</p>
          <p class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">${{ item.price }}</p>
          <router-link :to="`/product/${item.id}`" class="block text-center text-white dark:text-gray-900 bg-teal-500 dark:bg-teal-300 hover:bg-teal-600 dark:hover:bg-teal-400 font-semibold rounded-md py-2 mb-2 transition-colors duration-200 ease-in-out">
            View Details
          </router-link>
          <button @click="addToCart(item)" class="w-full bg-orange-500 text-white dark:text-gray-900 py-2 rounded-md hover:bg-orange-600 dark:hover:bg-orange-400 transition-all duration-200 ease-in-out">
            Add to Cart
          </button>
          <button @click="removeFromWishlist(item)" class="w-full mt-2 bg-teal-500 text-white dark:text-gray-900 py-2 rounded-md hover:bg-teal-600 dark:hover:bg-teal-400 transition-all duration-200 ease-in-out">
            Remove from Wishlist
          </button>
        </div>
      </div>
    </div>

    <!-- Empty Wishlist Message -->
    <div v-else class="text-center py-10">
      <p class="text-lg text-gray-600 dark:text-gray-400">Your wishlist is empty.</p>
      <router-link to="/" class="mt-4 inline-block text-blue-500 dark:text-blue-300 hover:underline">
        Continue Shopping
      </router-link>
    </div>

    <!-- Clear Wishlist Button -->
    <div class="mt-6">
      <button v-if="filteredAndSortedWishlist.length > 0" @click="clearWishlist" class="bg-orange-500 text-white dark:text-gray-900 rounded-md py-2 px-4">
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
