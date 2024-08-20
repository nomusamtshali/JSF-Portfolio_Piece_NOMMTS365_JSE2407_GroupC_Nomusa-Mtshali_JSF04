import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import Login from '../views/Login.vue';
import Comparison from '../views/Comparison.vue';
import Checkout from '../views/Checkout.vue';
import Wishlist from '../views/Wishlist.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/comparison', name: 'Comparison', component: Comparison, meta: { requiresAuth: true } },
  { path: '/checkout', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Authentication Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('jwt');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
