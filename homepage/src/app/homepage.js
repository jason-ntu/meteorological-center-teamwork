import { React, useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { onSnapshot, query, where, doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import db from "./firebase";
import { Collection, Service } from "./enum";
import './homepage.scss';

function Homepage() {
  const alarmsCollectionRef = collection(db, Collection.ALARMS);
  const [alarms, setAlarms] = useState([]);


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
          <tr>
            <td>
              <div className="badge badge-outline-low">Low Risk</div>
            </td>
            <td> some text some text some text some text some text... </td>
            <td>
              <div className="badge badge-outline-medium">Medium Risk</div>
            </td>
            <td> some text some text some text some text some text... </td>
            <td>
              <div className="badge badge-outline-high">High Risk</div>
            </td>
            <td> some text some text some text some text some text... </td>
          </tr>
        </table>
    </div >
  );
}

export default withRouter(Homepage);
