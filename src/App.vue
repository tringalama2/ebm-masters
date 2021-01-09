<template>
  <div class="bg-purple-100 text-purple-900 container mx-auto px-16">
    <div class="max-w-7xl mx-auto px-2 py-4">
      <nav id="nav" class="flex justify-between">
          <div>
              <a href="/" class="font-bold text-xl">EBM Masters</a>
          </div>
          <ul class="flex flex-row space-x-4 ml-6">
            <router-link v-for="route in routes" :key="route.path" :to="route.path" tag="li" v-slot="{ href, navigate, isActive }">
              <NavLink :active="isActive" :href="href" @click="navigate" :class="isActive ? 'text-white bg-purple-600 hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-purple-500 bg-purple-300 hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium'"
    >{{ route.name }}</NavLink
  >
            </router-link>
          </ul>
      </nav>
    </div>
    <div>{{ $route.isActive }}</div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Navigation',
  data() {
    return {
      routes: this.$router.options.routes
    };
  }
}
</script>