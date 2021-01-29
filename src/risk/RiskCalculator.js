import RiskCalculations from './RiskCalculations.js'

//risk = new RiskCalculations(2,3,14,25)
//risk.relativeRisk().safeDisplay().asPercent().roundFixed(1).get()

export default class RiskCalculator {
    constructor(exposureEvents, controlEvents, exposureTotalAtRisk, controlTotalAtRisk) {
        this.exposureEvents = exposureEvents
        this.controlEvents = controlEvents
        this.controlTotalAtRisk =controlTotalAtRisk
        this.exposureTotalAtRisk = exposureTotalAtRisk

        this.exposureNonEvents = RiskCalculations.exposureNonEvents(this.exposureTotalAtRisk, this.exposureEvents)
        this.controlNonEvents = RiskCalculations.controlNonEvents(this.controlTotalAtRisk, this.controlEvents)
        this.exposureRisk = RiskCalculations.exposureRisk(this.exposureEvents, this.exposureTotalAtRisk)
        this.baselineRisk = RiskCalculations.baselineRisk(this.controlEvents, this.controlTotalAtRisk)
        this.exposureOdds = RiskCalculations.exposureOdds(this.exposureEvents, this.exposureNonEvents)
        this.controlOdds = RiskCalculations.controlOdds(this.controlEvents, this.controlNonEvents)
        this.oddsRaio = RiskCalculations.oddsRaio(this.exposureOdds, this.controlOdds)
        this.relativeRisk = RiskCalculations.relativeRisk(this.exposureRisk, this.baselineRisk)
        this.relativeRiskReduction = RiskCalculations.relativeRiskReduction(this.exposureRisk, this.baselineRisk)
        this.absoluteRiskReduction = RiskCalculations.absoluteRiskReduction(this.exposureRisk, this.baselineRisk)
        this.numberNeededToTreat = RiskCalculations.numberNeededToTreat(this.exposureRisk, this.baselineRisk)
        this.relativeRiskIncrease = RiskCalculations.relativeRiskIncrease(this.exposureRisk, this.baselineRisk)
        this.absoluteRiskIncrease = RiskCalculations.absoluteRiskIncrease(this.exposureRisk, this.baselineRisk)
        this.numberNeededToHarm = RiskCalculations.numberNeededToHarm(this.exposureRisk, this.baselineRisk)

        this.isHarm = this.exposureRisk > this.baselineRisk

        this.result = null
    }

    get() {
        return this.result
    }
    
    exposureNonEventsRaw() {
        this.result = this.exposureNonEvents
        return this
    }
    
    controlNonEventsRaw() {
        this.result = this.controlNonEvents
        return this
    }

    exposureRiskRaw() {
        this.result = this.exposureRisk
        return this
    }

    baselineRiskRaw() {
        this.result = this.baselineRisk
        return this
    }

    relativeRiskRaw() {
        this.result = this.relativeRisk
        return this
    }

    exposureOddsRaw() {
        this.result = this.exposureOdds
        return this
    }

    controlOddsRaw() {
        this.result = this.controlOdds
        return this
    }

    oddsRaioRaw() {
        this.result = this.oddsRaio
        return this
    }

    relativeRiskReductionRaw() {
        this.result = this.relativeRiskReduction
        return this
    }

    absoluteRiskReductionRaw() {
        this.result = this.absoluteRiskReduction
        return this
    }

    numberNeededToTreatRaw() {
        this.result = this.numberNeededToTreat
        return this
    }

    relativeRiskIncreaseRaw() {
        this.result = this.relativeRiskIncrease
        return this
    }

    absoluteRiskIncreaseRaw() {
        this.result = this.absoluteRiskIncrease
        return this
    }

    numberNeededToHarmRaw() {
        this.result = this.numberNeededToHarm
        return this
    }

    safeDisplay() {
        if (Number.isNaN(this.result)) {
            this.result = ''
        }
        return this;
    }
    roundFixed(places = 1) {
        if (!Number.isNaN(this.result)) {
            this.result = Number.parseFloat(this.result).toFixed(places)
        }
        return this
    }
    roundPrecision(places = 3) {
        if (!Number.isNaN(this.result)) {
            this.result = Number.parseFloat(this.result).toPrecision(places)
        }
        return this
    }

    asPercent() {
        this.result = this.result * 100
        return this
    }
}