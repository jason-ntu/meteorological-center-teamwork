import React from "react";
import { Severity } from "./enum";

export function SeverityBadge({ severity }) {
  if (![Severity.LOW, Severity.MEDIUM, Severity.HIGH].includes(severity)) {
    severity = Severity.NONE
  }
  return <div className={`badge badge-outline-${severity}`}>{`${severity.toUpperCase()}`}</div>;
}