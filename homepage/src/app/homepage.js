import { React, useEffect, useState } from "react";
import { onSnapshot, query, where, doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import db from "./firebase";
import { Collection, Service } from "./enum";
import './homepage.scss';

function Homepage() {
  const alarmsCollectionRef = collection(db, Collection.ALARMS);
  const [alarms, setAlarms] = useState([]);
  const [earthquakeAlarms, setEarthquakeAlarms] = useState([]);
  const [electricityAlarms, setElectricityAlarms] = useState([]);
  const [reservoirAlarms, setReservoirAlarms] = useState([]);

  useEffect(() => {
    const readAlarms = async () => {
      const q = query(alarmsCollectionRef, where("service", "==", Service.EARTHQUAKE))
      const doc_refs = await getDocs(q);
      const newAlarms = []
      doc_refs.forEach(alarm => {
        newAlarms.push({
          id: alarm.id,
          ...alarm.data()
        })
      })
      setEarthquakeAlarms(newAlarms)
      console.log("earthquakeAlarms[0].id:" + earthquakeAlarms[0].id)
      console.log("earthquakeAlarms[1].id:" + earthquakeAlarms[1].id)
      console.log("earthquakeAlarms[2].id:" + earthquakeAlarms[2].id)
    }

    readAlarms();
  }, [alarmsCollectionRef]);


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
          <tr>
            <td>
              <div className="badge badge-outline-low">Low Risk</div>
            </td>
            <td> </td>
            <td>
              <div className="badge badge-outline-medium">Medium Risk</div>
            </td>
            <td> some text some text some text some text some text... </td>
            <td>
              <div className="badge badge-outline-high">High Risk</div>
            </td>
            <td> some text some text some text some text some text... </td>
          </tr>
        </tbody>
      </table>
    </div >
  );
}

export default Homepage;
