export default class DiagnosticTestPerformance {
	constructor(truePositives, falseNegatives, falsePositives, trueNegatives) {
		this.truePositives = truePositives;
        this.falseNegatives = falseNegatives;
        this.falsePositives = falsePositives;
        this.trueNegatives = trueNegatives;
    }

	get totalDiseasePresent() {
        return this.calcTotalDiseasePresent();
    }

	get totalDiseaseAbsent() {
        return this.calcTotalDiseaseAbsent();
    }

	get totalTestPositives() {
        return this.calcTotalTestPositives();
    }

	get totalTestNegatives() {
        return this.calcTotalTestNegatives();
    }

    get totalSample() {
        return this.calcTotalSample();
    }

    get sensitivity() {
        return this.calcSensitivity();
    }

    get specificity() {
        return this.calcSpecificity();
    }

    get positiveLR() {
        return this.calcPositiveLR();
    }
  
    get negativeLR() {
        return this.calcNegativeLR();
    }

    get positivePredictiveValue() {
        return this.calcPositivePredictiveValue();
    }

    get negativePredictiveValue() {
        return this.calcNegativePredictiveValue();
    }

    get accuracy() {
        return this.calcAccuracy();
    }

    get prevalence() {
        return this.calcPrevalence();
    }

	calcTotalDiseasePresent() {
        return this.truePositives + this.falseNegatives;
    }
  
    calcTotalDiseaseAbsent() {
        return this.falsePositives + this.trueNegatives;
    }
  
    calcTotalTestPositives() {
        return this.truePositives + this.falsePositives;
    }
  
    calcTotalTestNegatives() {
        return this.falseNegatives + this.trueNegatives;
    }
  
    calcTotalSample() {
        return this.calcTotalDiseasePresent() + this.calcTotalDiseaseAbsent();
    }

    calcSensitivity() {
        return this.truePositives / this.totalDiseasePresent;
    }

    calcSpecificity() {
        return this.trueNegatives / this.totalDiseaseAbsent;
    }
  
    calcPositiveLR() {
        return this.sensitivity / (1 - this.specificity)
    }

    calcNegativeLR() {
        return (1 - this.sensitivity) / this.specificity
    }

    calcPositivePredictiveValue() {
        return this.truePositives / this.totalTestPositives;
    }

    calcNegativePredictiveValue() {
        return this.trueNegatives / this.totalTestNegatives;
    }

    calcAccuracy() {  // the truth rate
        return (this.truePositives + this.trueNegatives) / this.totalSample;
    }

    calcPrevalence() {
        return this.totalDiseasePresent / this.totalSample;
    }

    changePrevalanceByFactor(factor) {
        this.falsePositives = this.falsePositives * factor;
        this.trueNegatives = this.trueNegatives * factor;
    }
}