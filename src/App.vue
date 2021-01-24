<template>
  <div class="bg-purple-100 text-purple-900 container mx-auto px-16">
    <nav>
      <div class="max-w-7xl mx-auto px-2 py-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0">
            <!-- <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"> -->
            <a href="/" class="font-bold text-xl">EBM Masters</a>
          </div>
          <div class="hidden md:block justify-self-end">
            <div class="ml-10 flex justify-end items-baseline space-x-4">
              <router-link v-for="route in routes" :key="route.path" :to="route.path"       custom v-slot="{ href, navigate, isActive }">
                <a :active="isActive" :href="href" @click="navigate" :class="'whitespace-nowrap font-medium text-sm rounded-md px-3 py-2 '+ (isActive ? 'text-white bg-purple-600 hover:bg-purple-500 hover:text-white' : 'text-purple-600 bg-purple-300 hover:bg-purple-500 hover:text-purple-100')">
                  {{ route.name }}</a>
              </router-link>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button class="inline-flex items-center justify-center p-2 rounded-md text-white bg-purple-600 hover:bg-purple-500 hover:text-white focus:outline-none"
              @click="smallMenuOpen = !smallMenuOpen">
              <span class="sr-only">Open main menu</span>
              <!--
                Heroicon name: menu

                Menu open: "hidden", Menu closed: "block"
              -->
              <svg :class="smallMenuOpen ? 'hidden' : 'block'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!--
                Heroicon name: x

                Menu open: "block", Menu closed: "hidden"
              -->
              <svg :class="smallMenuOpen ? 'block' : 'hidden'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!--
        Mobile menu, toggle classes based on menu state.

        Open: "block", closed: "hidden"
      -->
      <div :class="smallMenuOpen ? 'block' : 'hidden'"  class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link v-for="route in routes" :key="route.path" :to="route.path"       custom v-slot="{ href, navigate, isActive }">
            <a :active="isActive" :href="href" @click="navigate" :class="'block font-medium text-base rounded-md px-3 py-2 '+ (isActive ? 'text-white bg-purple-600 hover:bg-purple-500 hover:text-white' : 'text-purple-600 bg-purple-300 hover:bg-purple-500 hover:text-purple-100')">
              {{ route.name }}</a>
          </router-link>
        </div>
      </div>
    </nav>



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
      routes: this.$router.options.routes,
      smallMenuOpen: false
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