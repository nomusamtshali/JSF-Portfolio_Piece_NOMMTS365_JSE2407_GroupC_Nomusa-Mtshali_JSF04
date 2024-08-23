<script setup>
import { useStore } from "../store";
import { ref, onMounted } from "vue";

/**
 * @typedef {Object} Props
 * @property {Object} product - The product object
 * @property {boolean} [loading=false] - Indicates if the product is loading
 */

/**
 * @type {Props}
 */
const props = defineProps({
  product: Object,
  loading: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();

/** @type {import('vue').Ref<boolean>} */
const liked = ref(false);

/** @type {import('vue').Ref<boolean>} */
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products.value = data;
  } catch (error) {
  } finally {
    loading.value = false; // sets loading to false once data is fetched
  }
});

onMounted(() => {
  if (!props.loading && props.product) {
    liked.value = store
      .getWishlist()
      .some((item) => item.id === props.product.id);
  }
});

/**
 * Adds the product to the cart
 */
const addToCart = () => {
  store.addToCart(props.product);
};

/**
 * Adds the product to the comparison list
 */
const addToComparison = () => {
  store.addToComparison(props.product);
};

/**
 * Toggles the like status of the product and updates the wishlist
 */
const toggleLike = () => {
  liked.value = !liked.value;
  if (liked.value) {
    store.addToWishlist(props.product);
  } else {
    store.removeFromWishlist(props.product);
  }
};
</script>

<template>
  <!-- Skeleton Loader -->
  <div
    v-if="loading"
    class="product-card skeleton-card border rounded-lg shadow-md bg-gray-200 mx-auto animate-pulse"
  >
    <div class="relative mb-4 w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
    <div class="px-4 pb-4">
      <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
      <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
      <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
      <div class="mt-4 space-y-2">
        <div class="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div class="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  </div>

  <!-- Product Card -->
  <div
    v-else
    class="product-card border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white mx-auto"
  >
    <div class="relative mb-4">
      <img
        :src="product.image"
        :alt="product.title"
        class="product-image w-full object-contain p-2"
      />
      <div
        class="absolute top-2 left-2 bg-white bg-opacity-90 rounded-full p-2 shadow-md cursor-pointer"
        @click="toggleLike"
      >
        <svg
          v-if="liked"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-red-500"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 00-7.78 7.78l8.484 8.484a1 1 0 001.414 0L20.84 12.39a5.5 5.5 0 000-7.78z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 00-7.78 7.78l8.484 8.484a1 1 0 001.414 0L20.84 12.39a5.5 5.5 0 000-7.78z"
          />
        </svg>
      </div>
      <div
        class="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-3 py-1 shadow-md"
      >
        <p class="text-sm text-gray-800 font-semibold">
          ${{ product.price }}
        </p>
      </div>
    </div>
    <div class="px-4 pb-4">
      <h2 class="text-lg font-semibold text-gray-800 mb-2">
        {{ product.title }}
      </h2>
      <p class="text-sm text-gray-500 mb-2">
        {{ product.category }}
      </p>
      <div class="flex items-center mb-2">
        <span
          v-for="n in Math.round(product.rating.rate)"
          :key="n"
          class="text-yellow-500"
          >★</span
        >
        <span
          v-for="n in 5 - Math.round(product.rating.rate)"
          :key="`empty-${n}`"
          class="text-gray-300"
          >★</span
        >
        <span class="ml-2 text-sm text-gray-500"
          >({{ product.rating.count }} reviews)</span
        >
      </div>
      <router-link
        :to="`/product/${product.id}`"
        class="block text-center text-white bg-teal-500 dark:bg-teal-300 hover:bg-teal-600 dark:hover:bg-teal-400 font-semibold rounded-md py-2 mb-2 transition-colors duration-200 ease-in-out"
      >
        View Details
      </router-link>
      <div class="flex justify-between space-x-2">
        <button
          @click="addToCart"
          class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 dark:hover:bg-orange-400 transition-all duration-200 ease-in-out font-semibold"
        >
          Add to Cart
        </button>
        <button
          @click="addToComparison"
          class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 dark:hover:bg-orange-400 transition-all duration-200 ease-in-out font-semibold"
        >
          Compare
        </button>
      </div>
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

.skeleton-card {
  height: 24rem;
}
</style>
