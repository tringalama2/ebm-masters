<template>
  <div class="justify-center justify-items-center grid grid-cols-1">
    <h2 class="text-center">Performance Characteristics for Diagnostic Tests</h2>
    <div class="justify-self-center">
      <table class="table-auto border-collapse">
        <thead>
          <tr>
            <th colspan="2"></th>
            <th colspan="2" scope="colgroup" class="text-center border-b-2 border-purple-900 p-2">Disease</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th colspan="2" class=""></th>
            <th scope="row" class="text-center border-b border-purple-900 p-2">Present</th>
            <th scope="row" class="text-center border-b border-purple-900 p-2">Absent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowspan="2" scope="colgroup" class="text-left align-middle border-r-2 border-purple-900 p-2">Test</th>
            <th scope="row" class="align-middle border-r border-purple-900 p-2">Positive</th>
            <td class="p-2">
              <div class="flex justify-between space-x-4 content-center items-center">
                <div class="inline-block align-middle">True Positives</div>
                <div class="inline-block align-middle">a= <input tabindex="1" v-model.number="truePositives" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></div>
              </div>
            </td>
            <td class="p-2">
              <div class="flex justify-between space-x-4 content-center items-center">
                <div class="inline-block align-middle">False Positives</div>
                <div class="inline-block align-middle">b= <input tabindex="3" v-model.number="falsePositives" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row" class="align-middle border-r border-purple-900 p-2">Negative</th>
            <td class="p-2">
              <div class="flex justify-between space-x-4 content-center items-center">
                <div class="inline-block align-middle">False Negatives</div>
                <div class="inline-block align-middle">c= <input tabindex="2" v-model.number="falseNegatives" type="text" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></div>
              </div>
            </td>
            <td class="p-2">
              <div class="flex justify-between space-x-4 content-center items-center">
                <div class="inline-block align-middle">True Negatives</div>
                <div class="inline-block align-middle">d= <input tabindex="4" v-model.number="trueNegatives" type="text" class="py-1 px-2 bg-white  shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent" /></div>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <th scope="row" class="p-2 align-middle">Total</th>
            <td class="p-2 border-t border-b border-purple-900">
              <div class="flex justify-between space-x-4 content-center items-center">
                <div></div>
                <div>
                  a+c=<input disabled v-model.number="totalDiseasePresent" type="text" class="py-1 px-2 text-purple-600 font-medium bg-purple-200 shadow-sm rounded-lg w-16 border border-transparent" />
                </div>
              </div>
            </td>
            <td class="p-2 border-t border-b border-purple-900">
              <div class="flex justify-between space-x-4 content-center items-center">
                <div></div>
                <div>
                  b+d=<input disabled v-model.number="totalDiseaseAbsent" type="text" class="py-1 px-2 text-purple-600 font-medium bg-purple-200 shadow-sm rounded-lg w-16 border border-transparent" />
                </div>
              </div></td>
          </tr>
          <tr>
            <th></th>
            <th scope="row" class="p-2 align-middle">Total Sample Size</th>
            <td colspan="2" class="p-2 text-center">
                a+b+c+d=  <input disabled v-model.number="totalSample" type="text" class="py-1 px-2 text-purple-600 font-medium bg-purple-200 shadow-sm rounded-lg w-16 border border-transparent" />
                <button class="text-purple-100 inline-block px-2 py-1 mx-2 my-1 text-xs font-normal leading-6 text-center transition bg-purple-500 rounded-md shadow hover:shadow-lg hover:bg-purple-600 focus:outline-none ml-8"
                v-on:click="reset()">Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-center">Test Performance</h2>
    <div>
      <table class="table-auto border border-collapse border-purple-900">
        <thead>
          <tr class="bg-purple-900 text-white">
            <th scope="col" class="px-4 py-1 border border-purple-900">Statistic</th>
            <th scope="col" class="px-4 py-1 border border-purple-900">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Sensitivity</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ sensitivity }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Specificity</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ specificity }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Positive Likelihood Ratio</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ positiveLR }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Negative Likelihood Ratio</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ negativeLR }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Prevalence</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ prevalence }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Positive Predictive Value</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ positivePredictiveValue }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Negative Predictive Value</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ negativePredictiveValue }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Accuracy</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ accuracy }}%</td>
          </tr>
        </tbody>
      </table>
      <div class="mt-2">
        <h3 class="text-center">Change prevalence by:</h3>
        
        <div class="flex justify-center">
          <div>
            <button class="text-purple-100 inline-block px-2 py-1 mx-2 my-1 text-xs font-normal leading-6 text-center transition bg-purple-500 rounded-md shadow hover:shadow-lg hover:bg-purple-600 focus:outline-none"
            v-on:click="multiplyPrevalenceBy(.1)">* 1/10</button>
          </div>
          <div>
            <button class="text-purple-100 inline-block px-2 py-1 mx-2 my-1 text-xs font-normal leading-6 text-center transition bg-purple-500 rounded-md shadow hover:shadow-lg hover:bg-purple-600 focus:outline-none"
            v-on:click="multiplyPrevalenceBy(.5)">* 1/2</button>
          </div>
          <div>
            <button class="text-purple-100 inline-block px-2 py-1 mx-2 my-1 text-xs font-normal leading-6 text-center transition bg-purple-500 rounded-md shadow hover:shadow-lg hover:bg-purple-600 focus:outline-none"
            v-on:click="multiplyPrevalenceBy(2)">* 2</button>
          </div>
          <div>
            <button class="text-purple-100 inline-block px-2 py-1 mx-2 my-1 text-xs font-normal leading-6 text-center transition bg-purple-500 rounded-md shadow hover:shadow-lg hover:bg-purple-600 focus:outline-none"
            v-on:click="multiplyPrevalenceBy(10)">* 10</button>
          </div>
        </div>
      </div>
    </div>
    
    <h2 class="text-center">Posttest Probabilities</h2>
    <div>
      <table class="table-auto border border-collapse border-purple-900">
        <thead>
          <tr class="bg-purple-900 text-white">
            <th scope="col" class="px-4 py-1 border border-purple-900">Statistic</th>
            <th scope="col" class="px-4 py-1 border border-purple-900">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Pretest Probability (i.e. Prevalence)</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ prevalence }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Positive Likelihood Ratio</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ positiveLR }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Negative Likelihood Ratio</th>
            <td class="bg-white px-4 py-1 border border-purple-900">{{ negativeLR }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Posttest Probability Given Positive Test</th>
            <td class="bg-purple-200 px-4 py-1 border border-purple-900">{{     postTestProbabilityIfPositive }}%</td>
          </tr>
          <tr>
            <th scope="row" class="text-left px-4 py-1 border border-purple-900">Posttest Probability Given Negative Test</th>
            <td class="bg-purple-200 px-4 py-1 border border-purple-900">{{     postTestProbabilityIfNegative }}%</td>
          </tr>
        </tbody>
      </table>
      <div class="mt-2">
        <h3 class="text-center">Change prevalence to:</h3>
        <div class="flex justify-center">
          <div>
            <input type="text" v-model.number="changePrevalenceTo" class="py-1 px-2 bg-white shadow-sm rounded-lg w-16 border border-transparent focus:outline-none ring-2 ring-purple-200 focus:ring-purple-600 focus:border-transparent"/>
          </div>
          <div>
            <button class="text-purple-100 inline-block px-2 py-1 mx-2 my-1 text-xs font-normal leading-6 text-center transition bg-purple-500 rounded-md shadow hover:shadow-lg hover:bg-purple-600 focus:outline-none"
            v-on:click="setPrevalence()">Go</button>
          </div>
        </div>
      </div>
    </div>
    </div>

  <h2 class="text-center mt-16">Notes</h2>
    <div class="md:mx-16 lg:mx-48 xl:mx-64">
      <div>
      <p>*Remember the following:</p>
        <ul class="mb-2">
          <li>Most tests are either highly sensitive, or highly specific. <em>It is uncommon, yet highly desired, for a test to be both highly sensitive and highly specific.</em></li>
        </ul>

      <table class="table-auto border border-collapse border-purple-900">
        <thead>
        <tr class="bg-purple-900 text-white">
          <th scope="col" class="px-4 py-1 border border-purple-900">Sensitive Tests</th>
          <th scope="col" class="px-4 py-1 border border-purple-900">Specific Tests</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="bg-white px-4 py-1 border border-purple-900">Highly sensitive test will have <strong>low negative likelihood ratios (LR-)</strong></td>
          <td class="bg-white px-4 py-1 border border-purple-900">Highly specific test will have <strong>high positive likelihood ratios (LR+)</strong></td>
        </tr>
        <tr>
          <td class="bg-white px-4 py-1 border border-purple-900">A <span class="font-black bg-purple-900 p-1 text-white underline decoration-4">N</span>egative result of a Se<span class="font-black bg-purple-900 p-1 text-white underline decoration-4">N</span>sitive test decreases the likelihood of the target condition</td>
          <td class="bg-white px-4 py-1 border border-purple-900">A <span class="font-black bg-purple-900 p-1 text-white underline decoration-4">P</span>ositive result of a S<span class="font-black bg-purple-900 p-1 text-white underline decoration-4">P</span>ecific test increases the likelihood of the target condition</td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
</template>

<script>
import DiagnosticTestPerformance from './DiagnosticTestPerformance.js';
import { safeDisplay, roundFixed, roundPrecision } from "../helpers.js"

export default {
  name: 'DiagnosticTest',
  data() {
    return {
      truePositives: '',
      falseNegatives: '',
      falsePositives: '',
      trueNegatives: '',
      changePrevalenceTo: '',
    }
  },
  computed: {
    results() {
      return new DiagnosticTestPerformance(this.truePositives, this.falseNegatives, this.falsePositives, this.trueNegatives)
    },
    prevalence() {
      return this.displayIfAllFieldsFilled(roundPrecision(100 * this.results.prevalence))
    },
    totalDiseasePresent() {
      return this.displayIfAllFieldsFilled(safeDisplay(this.results.totalDiseasePresent))
    },
    totalDiseaseAbsent() {
      return this.displayIfAllFieldsFilled(safeDisplay(this.results.totalDiseaseAbsent))
    },
    totalSample() {
      return this.displayIfAllFieldsFilled(safeDisplay(this.results.totalSample))
    },
    sensitivity() {
      return this.displayIfAllFieldsFilled(roundPrecision(100 * this.results.sensitivity))
    },
    specificity() {
      return this.displayIfAllFieldsFilled(roundPrecision(100 * this.results.specificity))
    },
    positiveLR() {
      return this.displayIfAllFieldsFilled(roundFixed(this.results.positiveLR, 1))
    },
    negativeLR() {
      return this.displayIfAllFieldsFilled(roundFixed(this.results.negativeLR, 2))
    },
    positivePredictiveValue() {
      return this.displayIfAllFieldsFilled(roundPrecision(100 * this.results.positivePredictiveValue))
    },
    negativePredictiveValue() {
      return this.displayIfAllFieldsFilled(roundPrecision(100 * this.results.negativePredictiveValue))
    },
    accuracy() {
      return this.displayIfAllFieldsFilled(roundPrecision(100 * this.results.accuracy))
    },
    postTestProbabilityIfPositive() {
      return this.displayIfAllFieldsFilled(roundPrecision(100 * this.results.postTestProbabilityIfPositive))
    },
    postTestProbabilityIfNegative() {
      return this.displayIfAllFieldsFilled(roundPrecision(100 * this.results.postTestProbabilityIfNegative))
    }
    
  },
  methods: {
    reset() {
      this.truePositives = ''
      this.falseNegatives = ''
      this.falsePositives = ''
      this.trueNegatives = ''
      this.changePrevalenceTo = ''
    },
    multiplyPrevalenceBy(multiple) {
      if (this.allFieldsFilled()) {
          this.truePositives =  this.truePositives * multiple
          this.falseNegatives = this.falseNegatives * multiple
      }
    },
    setPrevalence() {
      if(this.isNumber(this.changePrevalenceTo)) {
        let newPrevalence = this.changePrevalenceTo/100
        let changeTotalDiseaseTo = (this.totalDiseaseAbsent*newPrevalence/(newPrevalence - 1))*-1
        this.multiplyPrevalenceBy(changeTotalDiseaseTo / this.totalDiseasePresent)
      }
    },
    isNumber(val) {
      return typeof val === "number"
    },
    allFieldsFilled() {
      return this.isNumber(this.truePositives) && this.isNumber(this.falseNegatives) && this.isNumber(this.falsePositives) && this.isNumber(this.trueNegatives)
    },
    displayIfAllFieldsFilled(val) {
      return this.allFieldsFilled() ? val : ''
    }
  }
}
</script>
