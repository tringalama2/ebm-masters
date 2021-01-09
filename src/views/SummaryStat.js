import jstat from 'jstat'

export default class SummaryStat {
  constructor(vector) {
    this.vector = vector
    this.stat = jstat(vector)
    this.alpha = 0.05
  }

  sampleSize() {
    return this.vector.length
  }

  sum() {
    return this.stat.sum()
  }

  min() {
    return this.stat.min()
  }

  max() {
    return this.stat.max()
  }

  arithmeticMean() {
    return this.stat.mean()
  }

  geoMean() {
    return this.stat.geomean()
  }

  median() {
    return this.stat.median()
  }

  mode() {
    return this.stat.mode()
  }

  range() {
    return this.stat.range()
  }

  varianceSample() {
    return this.stat.variance(true)
  }

  variancePopulation() {
    return this.stat.variance()
  }

  stdevSample() {
    return this.stat.stdev(true)
  }

  stdevPopulation() {
    return this.stat.stdev()
  }

  confidenceIntervalOfMean() {
    return this.stat.normalci(this.arithmeticMean(), this.alpha, this.vector)
  }

  confidenceIntervalOfGeoMean() {
    return this.stat.normalci(this.geoMean(), this.alpha, this.vector)
  }

  confidenceIntervalOfMedian() {
    return this.stat.tci(this.median(), this.alpha, this.vector)
  }
}