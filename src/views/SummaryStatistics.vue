<template>
  <div class="justify-center justify-items-center">
    <h2 class="text-center">Summary Statistics</h2>

    <div class="flex gap-8 justify-center">
      <div class="justify-self-end">
        <h3 class="text-center">Data Set Input</h3>
        <textarea class="h-72 w-48 py-1 px-2 bg-white shadow-sm rounded-lg border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" v-model="input"></textarea>
        <p class="w-48">Paste your dataset into the textbox.</p><p>Each line is one data value.</p>
      </div>
      <div class="justify-self-start">
        <table class="w-full border border-collapse border-purple-900">
          <thead>
            <tr class="bg-purple-900 text-white">
              <th scope="col" class="w-72 px-4 py-1 border border-purple-900">Statistic</th>
              <th scope="col" class="w-72 py-1 border border-purple-900">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Sample Size</th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ sampleSize }}</td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Minimum Value</th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ min }}</td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Maximum Value</th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ max }}</td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Range</th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ range }}</td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Arithmetic Mean</th>
              <td class="bg-white px-4 py-1 border border-purple-900">
                <div class="pt-5">{{ arithmeticMean }}</div>
                <div><small class="text-purple-700">{{ confidenceIntervalOfMean }}</small></div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Geometric Mean</th>
              <td class="bg-white px-4 py-1 border border-purple-900">
                <div class="pt-5">{{ geoMean }}</div>
                <div><small class="text-purple-700">{{ confidenceIntervalOfGeoMean }}</small></div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Median</th>
              <td class="bg-white px-4 py-1 border border-purple-900">
                <div class="pt-5">{{ median }}</div>
                <div><small class="text-purple-700">{{ confidenceIntervalOfMedian }}</small></div>
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Mode</th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ mode }}</td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Variance <small>(Sample)</small></th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ varianceSample }}</td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Variance <small>(Population)</small></th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ variancePopulation }}</td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Standard Deviation <small>(Sample)</small></th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ stdevSample }}</td>
            </tr>
            <tr>
              <th scope="row" class="text-left px-4 py-1 border border-purple-900">Standard Deviation <small>(Population)</small></th>
              <td class="bg-white px-4 py-1 border border-purple-900">{{ stdevPopulation }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import SummaryStat from './SummaryStat.js'
import { roundFixed } from "../helpers.js"

export default {
  name: 'SummaryStatistics',
  data() {
    return {
      input: '',
    }
    
  },
  computed: {
    vector() {
      if (this.emptyInput(this.input.trim())) {
        return []
      }
      let tempVector = []
      for (const value of this.input.trim().split('\n').values()) {
        tempVector.push(Number(value))
      }
      return tempVector
    },
    stats() {
      return new SummaryStat(this.vector)
    },
    sampleSize() {
      return this.vector.length
    },
    min() {
      return this.stats.min()
    },
    max() {
      return this.stats.max()
    },
    arithmeticMean() {
      return roundFixed(this.stats.arithmeticMean(), 3)
    },
    geoMean() {
      return roundFixed(this.stats.geoMean(), 3)
    },
    median() {
      return roundFixed(this.stats.median(), 3)
    },
    mode() {
      return this.stats.mode()
    },
    range() {
      if (isNaN(this.stats.range())) {
        return ''
      }
      return this.stats.range()
    },
    varianceSample() {
      if (!this.emptySample()) {
        return roundFixed(this.stats.varianceSample(), 3)
      }
      return ''
    },
    variancePopulation() {
      return roundFixed(this.stats.variancePopulation(), 3)
    },
    stdevSample() {
      if (!this.emptySample()) {
        return roundFixed(this.stats.stdevSample(), 3)
      }
      return ''
    },
    stdevPopulation() {
      return roundFixed(this.stats.stdevPopulation(), 3)
    },
    confidenceIntervalOfMean() {
      if (isNaN(this.stats.confidenceIntervalOfMean()[0])) {
        return ''
      }
      return this.display95CI(roundFixed(this.stats.confidenceIntervalOfMean()[0], 3) + ' to ' + roundFixed(this.stats.confidenceIntervalOfMean()[1], 3))
    },
    confidenceIntervalOfGeoMean() {
      if (isNaN(this.stats.confidenceIntervalOfGeoMean()[0])) {
        return ''
      }
      return this.display95CI(roundFixed(this.stats.confidenceIntervalOfGeoMean()[0], 3) + ' to ' + roundFixed(this.stats.confidenceIntervalOfGeoMean()[1], 3))
    },
    confidenceIntervalOfMedian() {
      if (isNaN(this.stats.confidenceIntervalOfMedian()[0])) {
        return ''
      }
      return this.display95CI(roundFixed(this.stats.confidenceIntervalOfMedian()[0], 3) + ' to ' + roundFixed(this.stats.confidenceIntervalOfMedian()[1], 3))
    }
  },
  methods: {
    emptyInput(str) {
       return str === ''
    },
    emptySample() {
      return this.vector.length === 0
    },
    display95CI(value) {
      return '(95% CI: ' + value + ')'
    }
  }
}
</script>