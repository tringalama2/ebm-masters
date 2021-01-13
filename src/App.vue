<template>
  <div class="bg-purple-100 text-purple-900 container mx-auto px-16">
    <div class="max-w-7xl mx-auto px-2 py-4">
      <nav id="nav" class="flex justify-between">
          <div>
              <a href="/" class="font-bold text-xl">EBM Masters</a>
          </div>
          <ul class="flex flex-row space-x-4 ml-6">
            <router-link v-for="route in routes" :key="route.path" :to="route.path" tag="li" v-slot="{ href, navigate, isActive }">
              <a :active="isActive" :href="href" @click="navigate" :class="isActive ? 'text-white bg-purple-600 hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-purple-500 bg-purple-300 hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium'"
    >{{ route.name }}</a
  >
            </router-link>
          </ul>
      </nav>
    </div>
    <div>{{ $route.isActive }}</div>
    
    <router-view />

    <footer class="footer relative pt-2 border-t border-purple-600 mt-16 ">
      <div class="container mx-auto px-6">
        <div class="flex flex-col items-center">
          <div class="sm:w-2/3 text-center py-6">
            <p class="text-sm text-purple-600 mb-2">
                The tools on this page are for educational purposes. Calculations must be re-checked and should not be used alone to guide patient care, nor should they substitute for clinical judgment. 
            </p>
            <p class="text-sm text-purple-400 font-medium mb-2">
                © {{ year }} by Steven Tringali
            </p>
          </div>
        </div>
      </div>
  </footer>
  </div>
</template>
<script>
export default {
  name: 'Navigation',
  data() {
    return {
      routes: this.$router.options.routes
    }
  },
  computed: {
    year() {
      let date = new Date()
      return date.getFullYear()
    }
  }
}
</script>