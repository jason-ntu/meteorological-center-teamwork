import { Severity } from "./enum";

export function analyzeReservior(name, percentage) {
    if (percentage < 10) {
        return [Severity.LOW, `The remaining water of ${name} is below 10%`];
    }
    else if (percentage < 20) {
        return [Severity.MEDIUM, `The remaining water of ${name} is below 20%`];
    }
    else if (percentage < 30) {
        return [Severity.HIGH, `The remaining water of ${name} is below 30%`];
    }
    else if (percentage > 95) {
        return [Severity.LOW, `The remaining water of ${name} is over 95%`];
    }
    else {
        return [Severity.NONE, ``];
    }
}

