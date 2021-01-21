<template>
  <div class="justify-center justify-items-center grid grid-cols-1">
    <h2 class="text-2xl text-center mt-8 mb-4">Risk Calculator for Treatment Effect</h2>
    <p class="pb-2 text-sm">While the conventional 2x2 table for estimating the size of the treatment effect is arranged with disease (outcome) status across the top and exposure status along the side, most manuscripts report the resutls of trials in a table with exposure status across the top, labeling each column.</p>
    <p class="pb-2 text-sm">For convenience, we we rotated the 2x2 table to align with common reporting of outcomes in trial manuscripts.</p>
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
            <td class="p-2 border-t border-b border-purple-900 text-right"><input v-model.number="exposureGroupSize" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></td>
            <td class="p-2 border-t border-b border-purple-900 text-right"><input v-model.number="controlGroupSize" type="text" class="py-1 px-2 bg-white  shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowspan="2" scope="colgroup" class="text-left align-middle border-r-2 border-purple-900 p-2">Outcome</th>
            <th scope="row" class="align-middle border-r border-purple-900 p-2">Yes</th>
            <td class="p-2 text-right">a=<input v-model.number="exposureEvents" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></td>
            <td class="p-2 text-right">c=<input v-model.number="controlEvents" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></td>
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

    <h2 class="text-2xl text-center mt-8 mb-4">Calculations</h2>
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
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Risk without exposure (<i>baseline risk</i> or <i>control event rate</i> [CER]) = c/(c+d)</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ baselineRisk }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Risk with exposure (<i>exposure event rate</i> [EER]) = a/(a+b)</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ exposureRisk }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Odds without exposure  = c/d</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ controlOdds }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Odds with exposure = a/b</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ exposureOdds }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Relative risk [RR] (<i>risk ratio</i>) = a/(a+b) / c/(c+d)</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ relativeRisk }}</td>
          </tr>
          <template v-if="!isHarm()">
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Relative risk reduction (also 1 - RR) = ( c/(c+d) - a/(a+b) ) / c/(c+d)</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ relativeRiskReduction }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Absolute risk reduction [ARR] (<i>risk difference</i>) = c/(c+d) - a/(a+b) </th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ absoluteRiskReduction }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Number needed to treat = 100 / (ARR as a %)</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ numberNeededToTreat }}</td>
          </tr>
          </template>
          <template v-if="isHarm()">
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-red-600 text-red-50" colspan="2">These results indicate harm: the event rate for the exposure group is greater than the control.</th>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Relative risk increase = ( a/(a+b) - c/(c+d) ) / a/(a+b)</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ relativeRiskIncrease }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Absolute risk increase [ARI]  = a/(a+b) - c/(c+d) </th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ absoluteRiskIncrease }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900 bg-purple-200">Number needed to harm = 100 / (ARI as a %)</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ numberNeededToHarm }}</td>
          </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { safeDisplay, roundFixed, roundPrecision } from '../helpers.js'

export default {
  name: 'Risk',
  data() {
    return {
      exposureGroupSize: '',
      controlGroupSize: '',
      exposureEvents: '',
      controlEvents: '',
    }
  },
  computed: {
    exposureNonEvents() {
      return this.displayIfAllFieldsFilled(safeDisplay(this.exposureGroupSize - this.exposureEvents))
    },
    controlNonEvents() {
      return this.displayIfAllFieldsFilled(safeDisplay(this.controlGroupSize - this.controlEvents))
    },
    exposureRisk() {
      return this.displayIfAllFieldsFilled(roundFixed(100 * this.exposureEvents / this.exposureGroupSize))
    },
    baselineRisk () {
      return this.displayIfAllFieldsFilled(roundFixed(100 * this.controlEvents / this.controlGroupSize))
    },
    rawExposureRisk() {
      return this.exposureEvents / this.exposureGroupSize
    },
    rawBaselineRisk() {
      return this.controlEvents / this.controlGroupSize
    },
    exposureOdds() {
      return this.displayIfAllFieldsFilled(roundFixed(this.exposureEvents / this.exposureNonEvents, 2))
    },
    controlOdds() {
      return this.displayIfAllFieldsFilled(roundFixed(this.controlEvents / this.controlNonEvents, 2))
    },
    relativeRisk() {
      return this.displayIfAllFieldsFilled(roundFixed(this.exposureRisk / this.baselineRisk, 2))
    },
    relativeRiskReduction() {
      return this.displayIfAllFieldsFilled(roundFixed(1 - this.relativeRisk, 2))
    },
    absoluteRiskReduction() {
      return this.displayIfAllFieldsFilled(roundPrecision((this.baselineRisk - this.exposureRisk), 2))
    },
    numberNeededToTreat() {
      return this.displayIfAllFieldsFilled(roundFixed(100 / this.absoluteRiskReduction, 0))
    },
    absoluteRiskIncrease() {
      return this.displayIfAllFieldsFilled(roundPrecision((this.exposureRisk - this.baselineRisk), 2))
    },
    relativeRiskIncrease() {
      return this.displayIfAllFieldsFilled(roundFixed((this.absoluteRiskIncrease / this.exposureRisk), 2))
    },
    numberNeededToHarm() {
      return this.displayIfAllFieldsFilled(roundFixed(100 / this.absoluteRiskIncrease, 0))
    }
  },
  methods: {
    reset() {
      this.exposureGroupSize = ''
      this.controlGroupSize = ''
      this.exposureEvents = ''
      this.controlEvents = ''
    },
    isNumber(val) {
      return typeof val === "number"
    },
    allFieldsFilled() {
      return this.isNumber(this.exposureGroupSize) && this.isNumber(this.controlGroupSize) && this.isNumber(this.exposureEvents) && this.isNumber(this.controlEvents)
    },
    displayIfAllFieldsFilled(val) {
      return this.allFieldsFilled() ? val : ''
    },
    isHarm() {
      return this.allFieldsFilled() && parseFloat(this.rawExposureRisk) > parseFloat(this.rawBaselineRisk)
    }
  }
}
</script>