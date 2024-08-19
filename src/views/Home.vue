<script setup>
  import { ref, computed, onMounted } from 'vue';
  import ProductCard from '../components/ProductCard.vue';
  
  const products = ref([]);
  const categories = ref([]);
  const selectedCategory = ref('');
  const selectedSort = ref('');
  
  const filteredAndSortedProducts = computed(() => {
    let filteredProducts = products.value;
  
    // Filter by selected category
    if (selectedCategory.value) {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory.value);
    }
  
    // Sort by selected sort option
    if (selectedSort.value === 'lowest') {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSort.value === 'highest') {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }
  
    return filteredProducts;
  });
  
  const filterProducts = () => {
    // The filtering is handled automatically by the computed property
  };
  
  const sortProducts = () => {
    // The sorting is handled automatically by the computed property
  };
  
  onMounted(async () => {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    products.value = data;
  
    // Extract unique categories
    categories.value = [...new Set(products.value.map(product => product.category))];
  });
  </script>

  <template>
    <div class="container mx-auto py-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <label for="category" class="mr-2 font-semibold">Filter by Category:</label>
          <select id="category" v-model="selectedCategory" @change="filterProducts" class="p-2 border rounded-md">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div>
          <label for="sort" class="mr-2 font-semibold">Sort by Price:</label>
          <select id="sort" v-model="selectedSort" @change="sortProducts" class="p-2 border rounded-md">
            <option value="">Default</option>
            <option value="lowest">Lowest to Highest</option>
            <option value="highest">Highest to Lowest</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in filteredAndSortedProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </template>
  
  