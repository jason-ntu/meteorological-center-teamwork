import { React, useEffect, useState } from "react";
import { onSnapshot, query, where, doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import db from "./firebase";
import { Collection, Service, Severity } from "./enum";
import './homepage.scss';

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

function Homepage() {
  const alarmsCollectionRef = collection(db, Collection.ALARMS);
  const alarmStates = [
    useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), // earthquake
    useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), // electricity
    useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), // reservoir
  ];

  const totalRows = alarmStates.length / 3

  useEffect(() => {
    console.log("useEffect")
    const readAlarms = async (service) => {
      const q = query(alarmsCollectionRef, where("service", "==", service))
      const doc_refs = await getDocs(q);
      const newAlarms = []
      doc_refs.forEach(alarm => {
        newAlarms.push({
          id: alarm.id,
          ...alarm.data()
        })
      })
      var offset
      if (service == Service.EARTHQUAKE) {
        offset = 0
      } else if (service == Service.ELECTRICITY) {
        offset = 1
      } else if (service == Service.RESERVIOR) {
        offset = 2
      } else {
        console.error("No such service!");
      }
      for (let i = 0; i < totalRows; i++) {
        const [, setAlarmState] = alarmStates[offset * totalRows + i]
        setAlarmState(newAlarms[i])
      }
    }

    readAlarms(Service.EARTHQUAKE)
    readAlarms(Service.ELECTRICITY)
    readAlarms(Service.RESERVIOR)
  }, []);


  return (
    <div div className="content" >
      <table className="table">
        <thead>
          <tr>
            <th> </th>
            <th> Earthquake </th>
            <th> </th>
            <th> Electricity</th>
            <th> </th>
            <th> Reservoir </th>
          </tr>
        </thead>
        <tbody>
          <Row alarmStates={alarmStates} i={0} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={1} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={2} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={3} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={4} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={5} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={6} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={7} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={8} totalRows={totalRows} />
          <Row alarmStates={alarmStates} i={9} totalRows={totalRows} />
        </tbody>
      </table>
    </div >
  );
}

export default Homepage;
