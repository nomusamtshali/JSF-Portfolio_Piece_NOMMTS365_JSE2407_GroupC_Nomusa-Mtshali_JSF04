import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useStore = defineStore('main', {
  state: () => ({
    products: [],
    categories: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    comparisonList: JSON.parse(localStorage.getItem('comparisonList')) || [],
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [], // Wishlist state
    jwt: localStorage.getItem('jwt') || '', 
    user: {},
  }),
  actions: {
    // Fetch Products
    async fetchProducts() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    // Fetch Categories
    async fetchCategories() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        this.categories = data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },

    // User Login
    async login(username, password) {
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const data = await response.json();
        this.jwt = data.token;
        this.user = jwtDecode(this.jwt); // decodes the JWT and sets the user state
        localStorage.setItem('jwt', this.jwt);
      } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Login failed');
      }
    },

    // User Logout
    logout() {
      this.jwt = '';
      this.user = {};
      localStorage.removeItem('jwt');
      this.cart = [];
      this.comparisonList = [];
      this.wishlist = []; // Clear wishlist on logout
      localStorage.removeItem('cart');
      localStorage.removeItem('comparisonList');
      localStorage.removeItem('wishlist');
    },

    // Cart Management
    addToCart(product) {
      const item = this.cart.find(item => item.product.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        this.cart.push({ product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    removeFromCart(product) {
      this.cart = this.cart.filter(item => item.product.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    clearCart() {
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    // Comparison List Management
    addToComparison(product) {
      if (this.comparisonList.length < 5 && !this.comparisonList.some(item => item.id === product.id)) {
        this.comparisonList.push(product);
        localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList));
      }
    },

    removeFromComparison(product) {
      this.comparisonList = this.comparisonList.filter(item => item.id !== product.id);
      localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList));
    },

    clearComparison() {
      this.comparisonList = [];
      localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList));
    },

    // Wishlist Management
    addToWishlist(product) {
      if (!this.wishlist.some(item => item.id === product.id)) {
        this.wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      }
    },

    removeFromWishlist(product) {
      this.wishlist = this.wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    },

    clearWishlist() {
      this.wishlist = [];
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    },

    getWishlist() {
      return this.wishlist;
    },
  },
});
