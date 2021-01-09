<template>
  <div class="justify-center justify-items-center grid grid-cols-1">
    <h2 class="text-3xl text-center mt-8 mb-4">
      Welcome!
    </h2>
  </div>
  <section class="py-8">

    <div class="flex flex-wrap items-center justify-center">
      <div class="p-4 w-full md:w-1/3">
        <router-link :to="{ name: 'Risk'}">
          <div class="flex flex-col overflow-hidden transition duration-500 ease-in-out transform bg-white rounded-md shadow-md hover:scale-105 hover:shadow-lg">
              <img class="rounded-t-lg" alt="article image"
                  src="/images/iv.jpg">
              <div class="px-6 pt-4 mb-2 text-xl font-bold">
                <span>Risk Calculator</span>
              </div>
              <div class="px-6 pt-2">
                <div class="h-16 truncate ...">Estimate the size of the treatment effect.</div>
              </div>
          </div>
        </router-link>
      </div>

      <div class="p-4 w-full md:w-1/3">
        <router-link :to="{ name: 'Diagnostic Tests'}">
          <div class="flex flex-col overflow-hidden transition duration-500 ease-in-out transform bg-white rounded-md shadow-md hover:scale-105 hover:shadow-lg">
            <img class="rounded-t-lg" alt="article image"
                src="/images/eeg.jpg">
            <div class="px-6 pt-4 mb-2 text-xl font-bold">
              <span>Diagnostic Tests</span>
            </div>
            <div class="px-6 pt-2">
              <div class="h-16 truncate ...">Let's get started with learning about likelihood ratios.</div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="p-4 w-full md:w-1/3">
        <router-link :to="{ name: 'Summary Statistics'}">
          <div class="flex flex-col overflow-hidden transition duration-500 ease-in-out transform bg-white rounded-md shadow-md hover:scale-105 hover:shadow-lg">
            <img class="rounded-t-lg" alt="article image"
                src="/images/histogram.jpg">
            <div class="px-6 pt-4 mb-2 text-xl font-bold">
              <span>Summary Statistics</span>
            </div>
            <div class="px-6 pt-2">
              <div class="h-16 truncate ...">Get some stats on your dataset.</div>
            </div>
          </div>
        </router-link>
      </div>

    </div>


    
  </section>
</template>