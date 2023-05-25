import React, { Component, useEffect, useState } from 'react';

import { query, where, orderBy, limit, collection, getDocs } from "firebase/firestore"
import db from "../firebase";
import { Collection, Service, Severity } from "./enum";

function SeverityBadge({ severity }) {
  if (![Severity.LOW, Severity.MEDIUM, Severity.HIGH].includes(severity)) {
    severity = Severity.NONE
  }
  return <div className={`badge badge-outline-${severity}`}>{`${severity.toUpperCase()}`}</div>;
}

function Row({ alarmStates, i, totalRows }) {
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

export class Homepage extends Component {
  render() {
    return (
      <div className="row">
        
      </div>
    );
  }
}

export default Homepage;