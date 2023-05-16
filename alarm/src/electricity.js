import { Severity } from "./enum";

export function analyzeElectricity(storage_rate) {
    if (storage_rate < 3) {
        return [Severity.HIGH, `The remaining electricity is below 3%`];
    }
    else if (storage_rate < 6) {
        return [Severity.MEDIUM, `The remaining electricity is below 6%`];
    }
    else if (storage_rate < 10) {
        return [Severity.LOW, `The remaining electricity is below 10%`];
    }
    else {
        return [Severity.NONE, ``];
    }
}

