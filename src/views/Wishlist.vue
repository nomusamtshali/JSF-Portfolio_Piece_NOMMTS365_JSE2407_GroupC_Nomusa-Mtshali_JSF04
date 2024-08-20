<script setup>
import { useStore } from "../store";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const wishlistItems = computed(() => store.getWishlist());

const addToCart = (product) => {
  store.addToCart(product);
};

const removeFromWishlist = (product) => {
  store.removeFromWishlist(product);
};

const clearWishlist = () => {
  store.clearWishlist();
};

onMounted(() => {
  if (!store.jwt) {
    router.push("/login");
  }
});
</script>

<template>
  <button
    @click="$router.go(-1)"
    class="bg-orange-500 text-white dark:text-gray-900 rounded-md py-2 px-4"
  >
    Back
  </button>
  <div class="container mx-auto py-6">
    <h1 class="text-2xl font-bold mb-4">My Wishlist:</h1>

    <div
      v-if="wishlistItems.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="item in wishlistItems"
        :key="item.id"
        class="product-card border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-800 mx-auto"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="product-image w-full object-contain p-2"
        />
        <div class="px-4 pb-4">
          <h2
            class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
          >
            {{ item.title }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {{ item.category }}
          </p>
          <router-link
            :to="`/product/${item.id}`"
            class="block text-center text-white dark:text-gray-900 bg-teal-500 dark:bg-teal-300 hover:bg-teal-600 dark:hover:bg-teal-400 font-semibold rounded-md py-2 mb-2 transition-colors duration-200 ease-in-out"
          >
            View Details
          </router-link>
          <button
            @click="addToCart(item)"
            class="w-full bg-orange-500 text-white dark:text-gray-900 py-2 rounded-md hover:bg-orange-600 dark:hover:bg-orange-400 transition-all duration-200 ease-in-out"
          >
            Add to Cart
          </button>
          <button
            @click="removeFromWishlist(item)"
            class="w-full mt-2 bg-teal-500 text-white dark:text-gray-900 py-2 rounded-md hover:bg-teal-600 dark:hover:bg-teal-400 transition-all duration-200 ease-in-out"
          >
            Remove from Wishlist
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-10">
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Your wishlist is empty.
      </p>
      <router-link
        to="/"
        class="mt-4 inline-block text-blue-500 dark:text-blue-300 hover:underline"
      >
        Continue Shopping
      </router-link>
    </div>

    <div class="mt-6">
      <button
        v-if="wishlistItems.length > 0"
        @click="clearWishlist"
        class="bg-orange-500 text-white dark:text-gray-900 rounded-md py-2 px-4"
      >
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
