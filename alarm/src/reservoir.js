import { Severity } from "./enum";
const mapIdToName = {
    "reservoir0": "石門水庫",
    "reservoir1": "寶山第二水庫",
    "reservoir2": "永和山水庫",
    "reservoir3": "鯉魚潭水庫",
    "reservoir4": "德基水庫",
    "reservoir5": "南化水庫",
    "reservoir6": "曾文水庫",
    "reservoir7": "烏山頭水庫"
}

export function analyzeReservior(id, percentage) {
    let name = mapIdToName[id];

    if (percentage < 10) {
        return [Severity.HIGH, `The remaining water of ${name} is below 10%`];
    }
    else if (percentage < 20) {
        return [Severity.MEDIUM, `The remaining water of ${name} is below 20%`];
    }
    else if (percentage < 30) {
        return [Severity.LOW, `The remaining water of ${name} is below 30%`];
    }
    else if (percentage > 95) {
        return [Severity.LOW, `The remaining water of ${name} is over 95%`];
    }
    else {
        return [Severity.NONE, ``];
    }
}

