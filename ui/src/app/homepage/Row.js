import React from "react";
import { SeverityBadge } from "./SeverityBadge";

export function Row({ alarmStates, i, totalRows }) {
  const earthquakeAlarm = alarmStates[i + totalRows * 0][0]
  const electricityAlarm = alarmStates[i + totalRows * 1][0]
  const reservoirAlarm = alarmStates[i + totalRows * 2][0]
  return (
    <tr>
      <td> <SeverityBadge severity={earthquakeAlarm.severity} /></td>
      <td> {earthquakeAlarm.description} </td>
      <td> <SeverityBadge severity={electricityAlarm.severity} /></td>
      <td> {electricityAlarm.description} </td>
      <td> <SeverityBadge severity={reservoirAlarm.severity} /></td>
      <td> {reservoirAlarm.description} </td>
    </tr>
  )
}