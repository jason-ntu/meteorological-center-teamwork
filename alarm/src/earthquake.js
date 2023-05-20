import { Severity } from "./enum";

export function analyzeEarthquake(magnitude, location) {
    if (magnitude > 5) {
        return [Severity.HIGH, `a strong earthquake happened at ${location}`];
    }
    else if (magnitude > 4) {
        return [Severity.MEDIUM, `a moderate earthquake happened at ${location}`];
    }
    else if (magnitude > 3) {
        return [Severity.LOW, `a light earthquake happened at ${location}`];
    }
    else {
        return [Severity.NONE, ``];
    }
}

