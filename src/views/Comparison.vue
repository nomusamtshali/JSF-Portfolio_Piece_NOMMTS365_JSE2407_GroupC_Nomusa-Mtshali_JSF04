<script setup>
import { computed } from 'vue';
import { useStore } from '../store';

const store = useStore();

const comparisonList = computed(() => store.comparisonList);

const removeFromComparison = (product) => {
  store.removeFromComparison(product);
};

const clearComparison = () => {
  store.clearComparison();
};
</script>

<template>
  <div class="max-w-5xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">Product Comparison</h1>
    <div v-if="comparisonList.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr>
              <th class="px-4 py-2 border border-gray-300 dark:border-gray-700"></th>
              <th v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left">
                <div class="flex justify-between items-center">
                  <button @click="removeFromComparison(product)" class="text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border border-gray-300 dark:border-gray-700 font-bold">Image</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 dark:border-gray-700 text-center">
                <img :src="product.image" :alt="product.title" class="h-32 mx-auto" />
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300 dark:border-gray-700 font-bold">Title</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 dark:border-gray-700 text-center">
                {{ product.title }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300 dark:border-gray-700 font-bold">Description</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left">
                {{ product.description }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300 dark:border-gray-700 font-bold">Price</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 dark:border-gray-700 text-center">
                ${{ product.price }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300 dark:border-gray-700 font-bold">Category</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 dark:border-gray-700 text-center">
                {{ product.category }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300 dark:border-gray-700 font-bold">Rating</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 dark:border-gray-700 text-center">
                {{ product.rating.rate }} / 5
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 border border-gray-300 dark:border-gray-700 font-bold">Reviews</td>
              <td v-for="product in comparisonList" :key="product.id" class="px-4 py-2 border border-gray-300 dark:border-gray-700 text-center">
                {{ product.rating.count }} reviews
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 text-right">
        <button @click="clearComparison" class="bg-red-500 text-white py-2 px-4 rounded-md">
          Clear Comparison List
        </button>
      </div>
    </div>
    <p v-else class="text-gray-500">No items in comparison list.</p>
  </div>
</template>


