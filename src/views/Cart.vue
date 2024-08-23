<script setup>
import { computed } from "vue";
import { useStore } from "../store";

/**
 * Store instance from Pinia
 * @type {import('pinia').Store}
 */
const store = useStore();

/**
 * Computed property for the cart items
 * @type {import('vue').ComputedRef<Array>}
 */
const cart = computed(() => store.cart);

/**
 * Computed property for the total cost of items in the cart
 * @type {import('vue').ComputedRef<number>}
 */
const totalCost = computed(() => {
  return cart.value.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
});

/**
 * Removes a product from the cart
 * @param {Object} product - The product to remove
 */
const removeFromCart = (product) => {
  store.removeFromCart(product);
};

/**
 * Clears all items from the cart
 */
const clearCart = () => {
  store.clearCart();
};

/**
 * Updates the quantity of an item in the cart
 * @param {Object} item - The cart item to update
 */
const updateQuantity = (item) => {
  if (item.quantity < 1) {
    item.quantity = 1;
  }
  store.updateCart();
};
</script>

<template>
  <button @click="$router.go(-1)" class="bg-teal-500 text-white rounded-md py-2 px-4 mb-4">
      Back
    </button>
  <div class="max-w-3xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>
    <div v-if="cart.length > 0">
      <div
        v-for="item in cart"
        :key="item.product.id"
        class="flex items-center justify-between mb-4 p-4 border rounded-md"
      >
        <img :src="item.product.image" alt="" class="h-16 object-cover" />
        <div class="flex-1 ml-4">
          <h2 class="text-lg font-bold">{{ item.product.title }}</h2>
          <p class="text-gray-600">Price: ${{ item.product.price }}</p>
          <div class="flex items-center mt-2">
            <label class="mr-2">Quantity:</label>
            <input
              v-model.number="item.quantity"
              type="number"
              class="w-16 p-1 border rounded-md"
              min="1"
              @input="updateQuantity(item)"
            />
          </div>
        </div>
        <button
          @click="removeFromCart(item.product)"
          class="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
      <div class="flex justify-between items-center mt-6">
        <p class="text-xl font-bold">Total: ${{ totalCost.toFixed(2) }}</p>
        <div>
          <button
            @click="clearCart"
            class="bg-orange-500 text-white py-2 px-4 rounded-md"
          >
            Clear Cart
          </button>
          <router-link
            to="/checkout"
            class="ml-4 bg-teal-500 text-white py-2 px-4 rounded-md"
            >Checkout</router-link
          >
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">Your cart is empty.</p>
  </div>
</template>
