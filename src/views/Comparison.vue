<script setup>
import { computed } from 'vue';
import { useStore } from '../store';

/**
 * Store instance from Pinia
 * @type {import('pinia').Store}
 */
const store = useStore();

/**
 * Computed property for the comparison list
 * @type {import('vue').ComputedRef<Array>}
 */
const comparisonList = computed(() => store.comparisonList);

/**
 * Removes a product from the comparison list
 * @param {Object} product - The product to remove
 */
const removeFromComparison = (product) => {
  store.removeFromComparison(product);
};

/**
 * Clears all items from the comparison list
 */
const clearComparison = () => {
  store.clearComparison();
};
</script>

<template>
  <button @click="$router.go(-1)" class="bg-teal-500 text-white rounded-md py-2 px-4 mb-4">
      Back
    </button>
  <div class="max-w-5xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">Product Comparison</h1>
    <div v-if="comparisonList.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="px-4 py-2 border border-gray-300"></th>
              <th v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 text-left">
                <div class="flex justify-between items-center">
                  <button @click="removeFromComparison(product)" class="text-orange-500 hover:underline">
                    Remove
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border border-gray-300  font-bold">Image</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300  text-center">
                <img :src="product.image" :alt="product.title" class="h-32 mx-auto" />
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300  font-bold">Title</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300  text-center">
                {{ product.title }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300  font-bold">Description</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300  text-left">
                {{ product.description }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300  font-bold">Price</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300  text-center">
                ${{ product.price }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300  font-bold">Category</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300  text-center">
                {{ product.category }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300  font-bold">Rating</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300  text-center">
                {{ product.rating.rate }} / 5
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300  font-bold">Reviews</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300  text-center">
                {{ product.rating.count }} reviews
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 text-right">
        <button @click="clearComparison" class="bg-teal-500 text-white py-2 px-4 rounded-md">
          Clear Comparison List
        </button>
      </div>
    </div>
    <p v-else class="text-gray-500">No items in comparison list.</p>
  </div>
</template>


