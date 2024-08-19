<script setup>
import { computed } from "vue";
import { useStore } from "../store";

const store = useStore();

const cart = computed(() => store.cart);

const totalCost = computed(() => {
  return cart.value.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
});

const removeFromCart = (product) => {
  store.removeFromCart(product);
};

const clearCart = () => {
  store.clearCart();
};

const updateQuantity = (item) => {
  if (item.quantity < 1) {
    item.quantity = 1;
  }
  store.updateCart();
};
</script>

<template>
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
            class="bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Clear Cart
          </button>
          <router-link
            to="/checkout"
            class="ml-4 bg-green-500 text-white py-2 px-4 rounded-md"
            >Checkout</router-link
          >
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">Your cart is empty.</p>
  </div>
</template>
