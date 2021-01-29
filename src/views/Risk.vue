<template>
  <div class="justify-center justify-items-center grid grid-cols-1">
    <h2 class="text-center">Risk Calculator for Treatment Effect</h2>
    <p class="pb-2 text-sm">While the conventional 2x2 table for estimating the size of the treatment effect is arranged with disease (outcome) status across the top and exposure status along the side, most manuscripts report the resutls of trials in a table with exposure status across the top, labeling each column.</p>
    <p class="pb-2 text-sm">For convenience, we we rotated the 2x2 table to align with common reporting of outcomes in trial manuscripts.</p>
    
    <div v-if="errors.length" class="bg-pink-200 border-l-4 border-pink-500 text-pink-800 p-4" role="alert">
      <p class="font-bold">Please correct the following error{{ (errors.length == 1 ? '' : 's') }}:</p>
      <p v-for="error in errors" :key="error">{{ error }}</p>
    </div>
    
    <div class="justify-self-center">
      <table class="table-auto border-collapse">
        <thead>
          <tr>
            <th colspan="2"></th>
            <th colspan="2" scope="colgroup" class="text-center border-b-2 border-purple-900 p-2">Exposure</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th colspan="2" class=""></th>
            <th scope="row" class="text-center border-b border-purple-900 p-2">Yes</th>
            <th scope="row" class="text-center border-b border-purple-900 p-2">No (Control)</th>
          </tr>
          <tr>
            <th></th>
            <th scope="row" class="align-middle">Total (N=)</th>
            <td class="p-2 border-t border-b border-purple-900 text-right"><input @blur="checkForm" v-model.number="exposureGroupSize" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></td>
            <td class="p-2 border-t border-b border-purple-900 text-right"><input @blur="checkForm" v-model.number="controlGroupSize" type="text" class="py-1 px-2 bg-white  shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowspan="2" scope="colgroup" class="text-left align-middle border-r-2 border-purple-900 p-2">Outcome</th>
            <th scope="row" class="align-middle border-r border-purple-900 p-2">Yes</th>
            <td class="p-2 text-right">a=<input @blur="checkForm" v-model.number="exposureEvents" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></td>
            <td class="p-2 text-right">c=<input @blur="checkForm" v-model.number="controlEvents" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></td>
          </tr>
          <tr>
            <th scope="row" class="align-middle border-r border-purple-900 p-2">No</th>
            <td class="p-2 text-right">b=<input disabled v-model.number="exposureNonEvents" type="text" class="py-1 px-2 text-purple-600 font-medium bg-purple-200 shadow-sm rounded-lg w-16 border border-transparent" /></td>
            <td class="p-2 text-right">d=<input disabled v-model.number="controlNonEvents" type="text" class="py-1 px-2 text-purple-600 font-medium bg-purple-200 shadow-sm rounded-lg w-16 border border-transparent" /></td>
          </tr>
          <tr>
            <th></th>
            <th scope="row" class="p-2 align-middle"></th>
            <td scope="row" colspan="2" class="p-2 text-center">
                <button class="text-purple-100 inline-block px-2 py-1 mx-2 my-1 text-xs font-normal leading-6 text-center transition bg-purple-500 rounded-md shadow hover:shadow-lg hover:bg-purple-600 focus:outline-none ml-8"
                v-on:click="reset()">Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-center">Calculations</h2>
    <div>
      <table class="table-auto border border-collapse border-purple-900">
        <thead>
          <tr class="bg-purple-900 text-white">
            <th scope="col" class="px-4 py-1 border border-purple-900">Measure</th>
            <th scope="col" class="px-4 py-1 border border-purple-900">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Risk without exposure <span class="font-normal">(<i>baseline risk</i> or <i>control event rate</i> [CER]) = c/(c+d)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ baselineRisk }}%</span></td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Risk with exposure <span class="font-normal">(<i>exposure event rate</i> [EER]) = a/(a+b)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ exposureRisk }}%</span></td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Odds without exposure <span class="font-normal">= c/d</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ controlOdds }}</span></td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Odds with exposure <span class="font-normal">= a/b</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ exposureOdds }}</span></td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Relative risk <span class="font-normal">[RR] (<i>risk ratio</i>) = a/(a+b) / c/(c+d)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ relativeRisk }}</span></td>
          </tr>
          <template v-if="isHarm() && showResults">
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-pink-200 text-pink-800" colspan="2">These results indicate harm: <span class="font-normal">the event rate for the exposure group is greater than the control.</span></th>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Relative risk increase <span class="font-normal">= ( a/(a+b) - c/(c+d) ) / a/(a+b)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ relativeRiskIncrease }}</span></td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Absolute risk increase <span class="font-normal">[ARI]  = a/(a+b) - c/(c+d)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ absoluteRiskIncrease }}%</span></td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Number needed to harm <span class="font-normal">= 100 / (ARI as a %)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ numberNeededToHarm }}</span></td>
          </tr>
          </template>
          <template v-else>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Relative risk reduction <span class="font-normal">(also 1 - RR) = ( c/(c+d) - a/(a+b) ) / c/(c+d)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ relativeRiskReduction }}</span></td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Absolute risk reduction <span class="font-normal">[ARR] (<i>risk difference</i>) = c/(c+d) - a/(a+b)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ absoluteRiskReduction }}%</span></td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Number needed to treat <span class="font-normal">= 100 / (ARR as a %)</span></th>
            <td class="bg-white px-4 py-1 border border-purple-900"><span v-if="showResults">{{ numberNeededToTreat }}</span></td>
          </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import RiskCalculator from '../risk/RiskCalculator.js'

export default {
  name: 'Risk',
  data() {
    return {
      errors: [],
      showResults: false,
      exposureGroupSize: '',
      controlGroupSize: '',
      exposureEvents: '',
      controlEvents: ''
    }
  },
  computed: {
    results() {
      return new RiskCalculator(this.exposureEvents, this.controlEvents, this.exposureGroupSize, this.controlGroupSize)
    },
    exposureNonEvents() {
      return this.results.exposureNonEventsRaw().safeDisplay().get()
    },
    controlNonEvents() {
      return this.results.controlNonEventsRaw().safeDisplay().get()
    },
    exposureRisk() {
      return this.results.exposureRiskRaw().asPercent().roundFixed(1).safeDisplay().get()
    },
    baselineRisk () {
      return this.results.baselineRiskRaw().asPercent().roundFixed(1).safeDisplay().get()
    },
    exposureOdds() {
      return this.results.exposureOddsRaw().roundFixed(2).safeDisplay().get()
    },
    controlOdds() {
      return this.results.controlOddsRaw().roundFixed(2).safeDisplay().get()
    },
    relativeRisk() {
      return this.results.relativeRiskRaw().roundFixed(2).safeDisplay().get()
    },
    relativeRiskReduction() {
      return this.results.relativeRiskReductionRaw().roundFixed(2).safeDisplay().get()
    },
    absoluteRiskReduction() {
      return this.results.absoluteRiskReductionRaw().asPercent().roundPrecision(2).safeDisplay().get()
    },
    numberNeededToTreat() {
      return this.results.numberNeededToTreatRaw().roundFixed(0).safeDisplay().get()
    },
    relativeRiskIncrease() {
      return this.results.relativeRiskIncreaseRaw().roundFixed(2).safeDisplay().get()
    },
    absoluteRiskIncrease() {
      return this.results.absoluteRiskIncreaseRaw().asPercent().roundPrecision(2).safeDisplay().get()
    },
    numberNeededToHarm() {
      return this.results.numberNeededToHarmRaw().roundFixed(0).safeDisplay().get()
    }
  },
  methods: {
    checkForm() {
      
      this.errors = []
      this.showResults = false

      if(this.exposureGroupSize
          && this.controlGroupSize
          && this.exposureEvents
          && this.controlEvents) {
        this.errors = []
        
        if (!this.isNumber(this.exposureGroupSize)) {
          this.errors.push('Exposure group total must be a number.')
        }

        if (!this.isNumber(this.controlGroupSize)) {
          this.errors.push('Control group total must be a number.')
        }

        if (!this.isNumber(this.exposureEvents)) {
          this.errors.push('Exposure events (outcomes) must be a number.')
        }

        if (!this.isNumber(this.controlEvents)) {
          this.errors.push('Control events (outcomes) must be a number.')
        }
        if (!this.errors.length) {
          this.showResults = true;
        }
      }
    },
    reset() {
      this.errors = []
      this.showResults = false
      this.controlEvents = ''
      this.exposureGroupSize = ''
      this.controlGroupSize = ''
      this.exposureEvents = ''
    },
    isNumber(val) {
      return typeof val === "number"
    },
    isHarm() {
      return this.results.isHarm
    }
  }
}
</script>