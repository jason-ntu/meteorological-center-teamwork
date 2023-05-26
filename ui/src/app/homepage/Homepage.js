import React, { useEffect, useState } from 'react';
import { Collection, Service, Severity } from "./enum";
import { Row } from "./Row";
import { query, where, orderBy, limit, collection, getDocs } from "firebase/firestore"
import db from "../firebase";

const Homepage = () => {
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
      const q = query(alarmsCollectionRef, where("service", "==", service), orderBy("order"), limit(10))
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
      for (let i = 0; i < totalRows && i < newAlarms.length; i++) {
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