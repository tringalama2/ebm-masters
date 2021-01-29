export default class RiskCalculations {
    constructor() {
        this.alpha = 0.05
    }

    static exposureNonEvents(exposureTotalAtRisk, exposureEvents) {
      return exposureTotalAtRisk - exposureEvents
    }

    static controlNonEvents(controlTotalAtRisk, controlEvents) {
      return controlTotalAtRisk - controlEvents
    }

    static totalAtRisk(events, nonEvents) {
        return events + nonEvents
    }

    static exposureTotalAtRisk(exposureEvents, exposureNonEvents) {
        return RiskCalculations.totalAtRisk(exposureEvents, exposureNonEvents)
    }

    static controlTotalAtRisk(controlEvents, controlNonEvents) {
        return RiskCalculations.totalAtRisk(controlEvents, controlNonEvents)
    }

    static risk(events, totalAtRisk) {
        return events / totalAtRisk
    }
    
    static exposureRisk(exposureEvents, exposureTotalAtRisk) {
      return RiskCalculations.risk(exposureEvents, exposureTotalAtRisk)
    }

    static baselineRisk(controlEvents, controlTotalAtRisk) {
      return RiskCalculations.risk(controlEvents, controlTotalAtRisk)
    }

    static odds(events, nonEvents) {
        return events / nonEvents
    }

    static exposureOdds(exposureEvents, exposureNonEvents) {
      return RiskCalculations.odds(exposureEvents, exposureNonEvents)
    }

    static controlOdds(controlEvents, controlNonEvents) {
      return RiskCalculations.odds(controlEvents, controlNonEvents)
    }

    static oddsRaio(exposureOdds, controlOdds) {
        return exposureOdds / controlOdds
    }

    static relativeRisk(exposureRisk, baselineRisk) {
      return exposureRisk / baselineRisk
    }

    static relativeRiskReduction(exposureRisk, baselineRisk) {
        return 1 - RiskCalculations.relativeRisk(exposureRisk, baselineRisk)
    }

    static absoluteRiskReduction(exposureRisk, baselineRisk) {
      return baselineRisk - exposureRisk
    }

    static numberNeededToTreat(exposureRisk, baselineRisk) {
        return 1 / RiskCalculations.absoluteRiskReduction(exposureRisk, baselineRisk)
    }
    
    static relativeRiskIncrease(exposureRisk, baselineRisk) {
        return (exposureRisk - baselineRisk) / exposureRisk
    }

    static absoluteRiskIncrease(exposureRisk, baselineRisk) {
        return exposureRisk - baselineRisk
    }

    static numberNeededToHarm(exposureRisk, baselineRisk) {
      return 1 / RiskCalculations.absoluteRiskIncrease(exposureRisk, baselineRisk)
    }
}