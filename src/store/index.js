import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

/**
 * Main store for the application
 * @typedef {Object} MainStore
 * @property {Array} products - List of products
 * @property {Array} categories - List of categories
 * @property {Array} cart - Items in the shopping cart
 * @property {Array} comparisonList - Items in the comparison list
 * @property {Array} wishlist - Items in the wishlist
 * @property {string} jwt - JSON Web Token for authentication
 * @property {Object} user - User information
 * @property {string} notificationMessage - Current notification message
 */

export const useStore = defineStore("main", {
  state: () => ({
    products: [],
    categories: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    comparisonList: JSON.parse(localStorage.getItem("comparisonList")) || [],
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    jwt: localStorage.getItem("jwt") || "",
    user: {},
    notificationMessage: "", // state for notifications
  }),
  actions: {
    /**
     * Set a notification message
     * @param {string} message - The message to display
     */
    setNotification(message) {
      this.notificationMessage = message;
      setTimeout(() => {
        this.notificationMessage = "";
      }, 1000); // clear notification after 1 seconds
    },

    /**
    * Fetch products from the API
    */
    async fetchProducts() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

     /**
     * Fetch categories from the API
     */
    async fetchCategories() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/categories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        this.categories = data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    /**
     * Login user
     * @param {string} username - User's username
     * @param {string} password - User's password
     * @returns {boolean} - Indicates if login was successful
     */
    async login(username, password) {
      try {
        const response = await fetch(`https://fakestoreapi.com/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        this.jwt = data.token;
        this.user = jwtDecode(this.jwt);
        localStorage.setItem("jwt", this.jwt);

        this.setNotification("You have logged in successfully.");

        return true; // Indicate success
      } catch (error) {
        this.setNotification("Login failed. Please check your credentials.");
        return false; // Indicate failure
      }
    },

    /**
     * Logout user
     */
    logout() {
      // clear user data and local storage
      this.jwt = "";
      this.user = {};
      localStorage.removeItem("jwt");
      this.cart = [];
      this.comparisonList = [];
      this.wishlist = [];
      localStorage.removeItem("cart");
      localStorage.removeItem("comparisonList");
      localStorage.removeItem("wishlist");

      this.setNotification("You have logged out successfully.");
    },

    /**
     * Add a product to the cart
     * @param {Object} product - The product to add
     */
    addToCart(product) {
      const item = this.cart.find((item) => item.product.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        this.cart.push({ product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));

      this.setNotification("Product added to cart.");
    },

    /**
     * Remove a product from the cart
     * @param {Object} product - The product to remove
     */
    removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.product.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(this.cart));

      this.setNotification("Product removed from cart.");
    },

    /**
     * Clear the cart
     */
    clearCart() {
      this.cart = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));

      this.setNotification("Cart cleared.");
    },

     /**
     * Add a product to the comparison list
     * @param {Object} product - The product to add
     */
    addToComparison(product) {
      if (
        this.comparisonList.length < 5 &&
        !this.comparisonList.some((item) => item.id === product.id)
      ) {
        this.comparisonList.push(product);
        localStorage.setItem(
          "comparisonList",
          JSON.stringify(this.comparisonList)
        );

        this.setNotification("Product added to comparison list.");
      } else if (this.comparisonList.length >= 5) {
        this.setNotification(
          "Comparison list is full. Please remove a product to add a new one."
        );
      }
    },

     /**
     * Remove a product from the comparison list
     * @param {Object} product - The product to remove
     */
    removeFromComparison(product) {
      this.comparisonList = this.comparisonList.filter(
        (item) => item.id !== product.id
      );
      localStorage.setItem(
        "comparisonList",
        JSON.stringify(this.comparisonList)
      );

      this.setNotification("Product removed from comparison list.");
    },

     /**
     * Clear the comparison list
     */
    clearComparison() {
      this.comparisonList = [];
      localStorage.setItem(
        "comparisonList",
        JSON.stringify(this.comparisonList)
      );

      this.setNotification("Comparison list cleared.");
    },

     /**
     * Add a product to the wishlist
     * @param {Object} product - The product to add
     */
    addToWishlist(product) {
      if (!this.wishlist.some((item) => item.id === product.id)) {
        this.wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(this.wishlist));

        this.setNotification("Product added to wishlist.");
      }
    },

    /**
     * Remove a product from the wishlist
     * @param {Object} product - The product to remove
     */
    removeFromWishlist(product) {
      this.wishlist = this.wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));

      this.setNotification("Product removed from wishlist.");
    },

    /**
     * Clear the wishlist
     */
    clearWishlist() {
      this.wishlist = [];
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));

      this.setNotification("Wishlist cleared.");
    },

    /**
     * Get the current wishlist
     * @returns {Array} - The current wishlist
     */
    getWishlist() {
      return this.wishlist;
    },
  },
});
