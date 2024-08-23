<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "../store";

/**
 * Store instance from Pinia
 * @type {import('pinia').Store}
 */
const store = useStore();

/**
 * Total cost of items in the cart
 * @type {import('vue').Ref<number>}
 */
const totalCost = ref(
  store.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
);

</script>

<template>
  <div class="max-w-3xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">Checkout</h1>
    <p class="text-xl mb-6">Total: ${{ totalCost.toFixed(2) }}</p>
  </div>
</template>
