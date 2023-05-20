import { React, useEffect, useState } from "react";
import { onSnapshot, query, where, doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import db from "./firebase";
import { Collection, Service, Severity } from "./enum";
import './homepage.scss';


function SeverityBadge({ severity }) {
  if (severity === Severity.LOW) {
    return <div className="badge badge-outline-low">Low Ergency</div>;
  } else if (severity === Severity.MEDIUM) {
    return <div className="badge badge-outline-medium">Medium Ergency</div>;
  } else if (severity === Severity.HIGH) {
    return <div className="badge badge-outline-high">High Ergency</div>;
  } else {
    return <div className="badge badge-outline-none">None</div>;
  }
}

function Homepage() {
  const alarmsCollectionRef = collection(db, Collection.ALARMS);
  const [alarms, setAlarms] = useState([]);

  const [earthquakeAlarm0, setEarthquakeAlarm0] = useState([]);
  const [earthquakeAlarm1, setEarthquakeAlarm1] = useState([]);
  // const [earthquakeAlarm2, setEarthquakeAlarm2] = useState([]);
  // const [earthquakeAlarm3, setEarthquakeAlarm3] = useState([]);
  // const [earthquakeAlarm4, setEarthquakeAlarm4] = useState([]);
  // const [earthquakeAlarm5, setEarthquakeAlarm5] = useState([]);
  // const [earthquakeAlarm6, setEarthquakeAlarm6] = useState([]);
  // const [earthquakeAlarm7, setEarthquakeAlarm7] = useState([]);
  // const [earthquakeAlarm8, setEarthquakeAlarm8] = useState([]);
  // const [earthquakeAlarm9, setEarthquakeAlarm9] = useState([]);
  const [electricityAlarm0, setElectricityAlarm0] = useState([]);
  const [electricityAlarm1, setElectricityAlarm1] = useState([]);
  // const [electricityAlarm2, setElectricityAlarm2] = useState([]);
  // const [electricityAlarm3, setElectricityAlarm3] = useState([]);
  // const [electricityAlarm4, setElectricityAlarm4] = useState([]);
  // const [electricityAlarm5, setElectricityAlarm5] = useState([]);
  // const [electricityAlarm6, setElectricityAlarm6] = useState([]);
  // const [electricityAlarm7, setElectricityAlarm7] = useState([]);
  // const [electricityAlarm8, setElectricityAlarm8] = useState([]);
  // const [electricityAlarm9, setElectricityAlarm9] = useState([]);
  const [reservoirAlarm0, setReservoirAlarm0] = useState([]);
  const [reservoirAlarm1, setReservoirAlarm1] = useState([]);
  // const [reservoirAlarm2, setReservoirAlarm2] = useState([]);
  // const [reservoirAlarm3, setReservoirAlarm3] = useState([]);
  // const [reservoirAlarm4, setReservoirAlarm4] = useState([]);
  // const [reservoirAlarm5, setReservoirAlarm5] = useState([]);
  // const [reservoirAlarm6, setReservoirAlarm6] = useState([]);
  // const [reservoirAlarm7, setReservoirAlarm7] = useState([]);
  // const [reservoirAlarm8, setReservoirAlarm8] = useState([]);
  // const [reservoirAlarm9, setReservoirAlarm9] = useState([]);

  useEffect(() => {
    console.log("useEffect!")
    const readEarthquakeAlarms = async () => {
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
      setEarthquakeAlarm0(newAlarms[0])
      setEarthquakeAlarm1(newAlarms[1])
      // setEarthquakeAlarm2(newAlarms[2])
      // setEarthquakeAlarm3(newAlarms[3])
      // setEarthquakeAlarm4(newAlarms[4])
      // setEarthquakeAlarm5(newAlarms[5])
      // setEarthquakeAlarm6(newAlarms[6])
      // setEarthquakeAlarm7(newAlarms[7])
      // setEarthquakeAlarm8(newAlarms[8])
      // setEarthquakeAlarm9(newAlarms[9])
    }
    const readElectricityAlarms = async () => {
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
      setElectricityAlarm0(newAlarms[0])
      setElectricityAlarm1(newAlarms[1])
      // setElectricityAlarm2(newAlarms[2])
      // setElectricityAlarm3(newAlarms[3])
      // setElectricityAlarm4(newAlarms[4])
      // setElectricityAlarm5(newAlarms[5])
      // setElectricityAlarm6(newAlarms[6])
      // setElectricityAlarm7(newAlarms[7])
      // setElectricityAlarm8(newAlarms[8])
      // setElectricityAlarm9(newAlarms[9])
    }
    const readReservoirAlarms = async () => {
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
      setReservoirAlarm0(newAlarms[0])
      setReservoirAlarm1(newAlarms[1])
      // setReservoirAlarm2(newAlarms[2])
      // setReservoirAlarm3(newAlarms[3])
      // setReservoirAlarm4(newAlarms[4])
      // setReservoirAlarm5(newAlarms[5])
      // setReservoirAlarm6(newAlarms[6])
      // setReservoirAlarm7(newAlarms[7])
      // setReservoirAlarm8(newAlarms[8])
      // setReservoirAlarm9(newAlarms[9])
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
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm0.severity} />
            </td>
            <td> {earthquakeAlarm0.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm0.severity} />
            </td>
            <td> {electricityAlarm0.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm0.severity} />
            </td>
            <td> {reservoirAlarm0.description} </td>
          </tr>
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm1.severity} />
            </td>
            <td> {earthquakeAlarm1.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm1.severity} />
            </td>
            <td> {electricityAlarm1.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm1.severity} />
            </td>
            <td> {reservoirAlarm1.description} </td>
          </tr>
          {/* <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm2.severity} />
            </td>
            <td> {earthquakeAlarm2.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm2.severity} />
            </td>
            <td> {electricityAlarm2.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm2.severity} />
            </td>
            <td> {reservoirAlarm2.description} </td>
          </tr>
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm3.severity} />
            </td>
            <td> {earthquakeAlarm3.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm3.severity} />
            </td>
            <td> {electricityAlarm3.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm3.severity} />
            </td>
            <td> {reservoirAlarm3.description} </td>
          </tr>
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm4.severity} />
            </td>
            <td> {earthquakeAlarm4.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm4.severity} />
            </td>
            <td> {electricityAlarm4.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm4.severity} />
            </td>
            <td> {reservoirAlarm4.description} </td>
          </tr>
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm5.severity} />
            </td>
            <td> {earthquakeAlarm5.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm5.severity} />
            </td>
            <td> {electricityAlarm5.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm5.severity} />
            </td>
            <td> {reservoirAlarm5.description} </td>
          </tr>
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm6.severity} />
            </td>
            <td> {earthquakeAlarm6.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm6.severity} />
            </td>
            <td> {electricityAlarm6.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm6.severity} />
            </td>
            <td> {reservoirAlarm6.description} </td>
          </tr>
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm7.severity} />
            </td>
            <td> {earthquakeAlarm7.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm7.severity} />
            </td>
            <td> {electricityAlarm7.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm7.severity} />
            </td>
            <td> {reservoirAlarm7.description} </td>
          </tr>
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm8.severity} />
            </td>
            <td> {earthquakeAlarm8.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm8.severity} />
            </td>
            <td> {electricityAlarm8.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm8.severity} />
            </td>
            <td> {reservoirAlarm8.description} </td>
          </tr>
          <tr>
            <td>
              <SeverityBadge severity={earthquakeAlarm9.severity} />
            </td>
            <td> {earthquakeAlarm9.description} </td>
            <td>
              <SeverityBadge severity={electricityAlarm9.severity} />
            </td>
            <td> {electricityAlarm9.description} </td>
            <td>
              <SeverityBadge severity={reservoirAlarm9.severity} />
            </td>
            <td> {reservoirAlarm9.description} </td>
          </tr> */}
        </tbody>
      </table>
    </div >
  );
}

export default Homepage;
