import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore"
import db from "./firebase";


export default function App() {
  // Use useState to record data
  const [reservoir, getReservoir] = useState([]);
  const [electricity, getElectricity] = useState([]);
  const [earthquake, getEarthquake] = useState([]);
  
  //console.log('reservoir: ', reservoir);
  //console.log('electricity: ', electricity);
  //console.log('earthquake: ', earthquake);

  // useEffect:  requst data from firestore when loading the page
  useEffect(()=>{
    // Get data from reservoir 
    const reservoir_listen = onSnapshot(collection(db,'reservoir'),(snapshot)=> 
    getReservoir(snapshot.docs.map((doc) => doc.data())));

    // Get data from electricity
    const electricity_listen = onSnapshot(collection(db,'electricity'),(snapshot)=>
    getElectricity(snapshot.docs.map((doc) => doc.data())));

    // Get data from earthquake 
    const earthquake_listen = onSnapshot(collection(db,'earthquake'),(snapshot)=>
    getEarthquake(snapshot.docs.map((doc) => doc.data())));

    return () =>{
      reservoir_listen();
      electricity_listen();
      earthquake_listen();
    }

  }, []);



  return (
  <div className = "root">
    <label>Reservoir data: </label>
    <pre>{JSON.stringify(reservoir, null, 2)}</pre>
    <label>Electricity data: </label>
    <pre>{JSON.stringify(electricity, null, 2)}</pre>
    <label>Earthquake data: </label>
    <pre>{JSON.stringify(earthquake, null, 2)}</pre>
  </div>
  
  );
}
