<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../store";

const store = useStore();
const route = useRoute();
const product = ref(null);

onMounted(async () => {
    const productId = route.params.id;
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await response.json();
    product.value = data;
  });

function addToCart() {
  store.addToCart(product.value);
}
</script>

<template>
  <div v-if="product">
    <img
      :src="product.image"
      :alt="product.title"
      class="h-80 object-cover mb-4"
    />
    <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
    <p class="text-xl text-gray-600 mb-2">{{ product.category }}</p>
    <p class="text-2xl font-bold text-green-500 mb-4">${{ product.price }}</p>
    <p class="text-sm text-gray-600 mb-4">{{ product.description }}</p>
    <button
      @click="addToCart"
      class="bg-blue-500 text-white py-2 px-4 rounded-md"
    >
      Add to Cart
    </button>
  </div>
</template>
