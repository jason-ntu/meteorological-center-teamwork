import { React, useEffect, useState } from "react";
import { onSnapshot, query, where, doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import db from "./firebase";
import { Collection, Service, Severity } from "./enum";
import './homepage.scss';

function SeverityBadge({ severity }) {
  if (severity === Severity.LOW) {
    return <td><div className="badge badge-outline-low">Low Ergency</div>;</td>
  } else if (severity === Severity.MEDIUM) {
    return <td><div className="badge badge-outline-medium">Medium Ergency</div>;</td >
  } else if (severity === Severity.HIGH) {
    return <td><div className="badge badge-outline-high">High Ergency</div>;</td >
  } else {
    return <td><div className="badge badge-outline-none">None</div>;</td >
  }
}

function Row({ alarmStates, i, totalRows }) {
  const earthquakeAlarm = alarmStates[i + totalRows * 0][0]
  const electricityAlarm = alarmStates[i + totalRows * 1][0]
  const reservoirAlarm = alarmStates[i + totalRows * 2][0]
  return (
    <tr>
      <SeverityBadge severity={earthquakeAlarm.severity} />
      <td> {earthquakeAlarm.description} </td>
      <SeverityBadge severity={electricityAlarm.severity} />
      <td> {electricityAlarm.description} </td>
      <SeverityBadge severity={reservoirAlarm.severity} />
      <td> {reservoirAlarm.description} </td>
    </tr>
  )
}


function Homepage() {
  const alarmsCollectionRef = collection(db, Collection.ALARMS);
  const alarmStates = [
    useState([]), useState([]), useState([]), useState([]), // earthquake
    useState([]), useState([]), useState([]), useState([]), // electricity
    useState([]), useState([]), useState([]), useState([]), // reservoir
  ];
  
  const totalRows = alarmStates.length / 3

  useEffect(() => {
    console.log("useEffect!")
    const readEarthquakeAlarms = async (offset = totalRows * 0) => {
      console.log("readEarthquakeAlarms")
      const q = query(alarmsCollectionRef, where("service", "==", Service.EARTHQUAKE))
      const doc_refs = await getDocs(q);
      const newAlarms = []
      doc_refs.forEach(alarm => {
        newAlarms.push({
          id: alarm.id,
          ...alarm.data()
        })
      })

      for (let i = 0; i < totalRows; i++) {
        const [, setAlarmState] = alarmStates[offset + i]
        setAlarmState(newAlarms[i])
      }
    }
    const readElectricityAlarms = async (offset = totalRows * 1) => {
      console.log("readElectricityAlarms")
      const q = query(alarmsCollectionRef, where("service", "==", Service.ELECTRICITY))
      const doc_refs = await getDocs(q);
      const newAlarms = []
      doc_refs.forEach(alarm => {
        newAlarms.push({
          id: alarm.id,
          ...alarm.data()
        })
      })

      for (let i = 0; i < totalRows; i++) {
        const [, setAlarmState] = alarmStates[offset + i]
        setAlarmState(newAlarms[i])
      }
    }
    const readReservoirAlarms = async (offset = totalRows * 2) => {
      console.log("readReservoirAlarms")
      const q = query(alarmsCollectionRef, where("service", "==", Service.RESERVIOR))
      const doc_refs = await getDocs(q);
      const newAlarms = []
      doc_refs.forEach(alarm => {
        newAlarms.push({
          id: alarm.id,
          ...alarm.data()
        })
      })

      for (let i = 0; i < totalRows; i++) {
        const [, setAlarmState] = alarmStates[offset + i]
        setAlarmState(newAlarms[i])
      }
    }

    readEarthquakeAlarms();
    readElectricityAlarms();
    readReservoirAlarms();
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
        </tbody>
      </table>
    </div >
  );
}

export default Homepage;
