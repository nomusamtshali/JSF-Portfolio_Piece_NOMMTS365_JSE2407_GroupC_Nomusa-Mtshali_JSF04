<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useStore } from '../store';

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref('');
const selectedSort = ref('');
const store = useStore();

// Fetch products and categories on component mount
onMounted(async () => {
  const response = await fetch(`https://fakestoreapi.com/products`);
  const data = await response.json();
  products.value = data;

  // Extract unique categories
  categories.value = [...new Set(products.value.map(product => product.category))];
});

// Filter and sort products
const filteredAndSortedProducts = computed(() => {
  let filteredProducts = products.value;

  if (selectedCategory.value) {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory.value);
  }

  if (selectedSort.value === 'lowest') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort.value === 'highest') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return filteredProducts;
});

// Wishlist carousel
const wishlistItems = computed(() => store.getWishlist());

</script>

<template>
<!-- Wishlist Carousel -->
    <div v-if="wishlistItems.length > 0" class="mt-">
      <h2 class="text-xl font-bold mb-2">My Wishlist:</h2>
      <div class="carousel-container overflow-x-auto whitespace-nowrap space-x-4">
        <div v-for="item in wishlistItems" :key="item.id" class="inline-block product-card border rounded-lg shadow-md bg-white dark:bg-gray-800 mx-auto" style="width: 15rem;">
          <img :src="item.image" :alt="item.title" class="product-image w-full object-contain p-2" />
          <div class="px-4 pb-4">
            <h2 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2 truncate">{{ item.title }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">${{ item.price }}</p>
            <router-link :to="`/product/${item.id}`" class="block text-center text-white dark:text-gray-900 bg-teal-500 dark:bg-teal-300 hover:bg-teal-600 dark:hover:bg-teal-400 font-semibold rounded-md py-2 mb-2 transition-colors duration-200 ease-in-out">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>

  <div class="container mx-auto py-6">
    <!-- Filter and Sort Controls -->
    <div class="flex flex-wrap justify-center mb-8">
      <div>
        <label for="category" class="mr-2 font-semibold">Filter by Category:</label>
        <select id="category" v-model="selectedCategory" @change="filterProducts" class="p-2 border rounded-md">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="ml-12">
        <label for="sort" class="mr-2 font-semibold">Sort by Price:</label>
        <select id="sort" v-model="selectedSort" @change="sortProducts" class="p-2 border rounded-md">
          <option value="">Default</option>
          <option value="lowest">Lowest to Highest</option>
          <option value="highest">Highest to Lowest</option>
        </select>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in filteredAndSortedProducts" :key="product.id" :product="product" />
    </div>

    
  </div>
</template>

<style scoped>
.carousel-container {
  display: flex;
  overflow-x: auto;
  padding: 1rem 0;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-image {
  height: 10rem;
  border-bottom: 1px solid #e5e7eb;
}

.product-card .px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.product-card .pb-4 {
  padding-bottom: 1rem;
}

.product-card .truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.carousel-container > .product-card + .product-card {
  margin-left: 1rem;
}
</style>
