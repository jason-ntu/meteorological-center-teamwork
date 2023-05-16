import { useEffect, useState } from "react";
import { onSnapshot, query, where, doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import db from "./firebase";
import { Collection, Service, Severity } from "./enum";
import { analyzeReservior } from "./reservoir";
import { analyzeElectricity } from "./electricity";
import { analyzeEarthquake } from "./earthquake";

function App() {
  const alarmsCollectionRef = collection(db, Collection.ALARMS);
  const earthquakeCollectionRef = collection(db, Collection.EARTHQUAKE);
  const electricityCollectionRef = collection(db, Collection.ELECTRICITY);
  const reservoirCollectionRef = collection(db, Collection.RESERVIOR);
  const [earthquake, setEarthquake] = useState([]);
  const [electricity, setElectricity] = useState([]);
  const [reservoir, setReservoir] = useState([]);

  const increaseOrder = async (doc) => {
    const docSnap = await getDoc(doc);
    await updateDoc(doc, { order: docSnap.data().order + 1 });
  }

  const updateOldAlarms = async (service) => {
    console.log("updateOldAlarms");
    const q = query(alarmsCollectionRef, where("service", "==", service));
    const querySnapshot = await getDocs(q);
    let IDs = [];
    querySnapshot.forEach((doc) => {
      IDs.push(doc.id);
    });
    IDs.forEach((id) => {
      increaseOrder(doc(db, Collection.ALARMS, id));
    });
  };

  const createAlarm = async (service, severity, description) => {
    console.log("createAlarm")
    await addDoc(alarmsCollectionRef, { service: service, severity: severity, description: description, order: 1 });
  }

  const deleteOutdatedAlarms = async () => {
    console.log("deleteOutdatedAlarms");
    // Fixme: order should be > 10
    const q = query(alarmsCollectionRef, where("order", ">", 9));
    const querySnapshot = await getDocs(q);
    let IDs = [];
    querySnapshot.forEach((doc) => {
      IDs.push(doc.id);
    });
    console.log(IDs);
    IDs.forEach((id) => {
      deleteDoc(doc(db, Collection.ALARMS, id));
    });
  }

  const detectEarthquake = async (doc) => {
    console.log("detectEarthquake");
    const magnitude = Number(doc.magnitude.replace("級", ""));
    const location = doc.location;
    const [severity, description] = analyzeEarthquake(magnitude, location);
    if (severity !== Severity.NONE) {
      await updateOldAlarms(Service.EARTHQUAKE);
      await createAlarm(Service.EARTHQUAKE, severity, description);
      await deleteOutdatedAlarms();
    }
  }

  const detectElectricity = async (doc) => {
    console.log("detectElectricity");
    var storage_rate = Number(doc.storage_rate.replace("％", ""));
    const [severity, description] = analyzeElectricity(storage_rate);
    if (severity !== Severity.NONE) {
      await updateOldAlarms(Service.ELECTRICITY);
      await createAlarm(Service.ELECTRICITY, severity, description);
      await deleteOutdatedAlarms();
    }
  }

  const detectReservior = async (doc) => {
    for (const [name, attrs] of Object.entries(doc)) {
      console.log(`${name}.percentage: ` + attrs.percentage)
      const percentage = Number(attrs.percentage.replace("%", ""));
      const [severity, description] = analyzeReservior(name, percentage);
      if (severity !== Severity.NONE) {
        await updateOldAlarms(Service.RESERVIOR);
        await createAlarm(Service.RESERVIOR, severity, description);
        await deleteOutdatedAlarms();
      }
    }
  }

  useEffect(() => {
    const readEarthquake = async () => {
      console.log("readEarthquake");
      onSnapshot(earthquakeCollectionRef, async (snapshot) => {
        setEarthquake(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        snapshot.docs.map(doc => detectEarthquake(doc.data()));
      });
    }

    const readElectricity = async () => {
      console.log("readElectricity");
      onSnapshot(electricityCollectionRef, (snapshot) => {
        setElectricity(snapshot.docs.map(doc => doc.data()));
        snapshot.docs.map((doc) => detectElectricity(doc.data()));
      });
    }

    const readReservoir = async () => {
      console.log("readReservoir");
      onSnapshot(reservoirCollectionRef, (snapshot) => {
        setReservoir(snapshot.docs.map(doc => doc.data()));
        snapshot.docs.map((doc) => detectReservior(doc.data()));
      });
    }

    return () => {
      readEarthquake();
      readElectricity();
      readReservoir();
    }
  }, []);

  return (
    <div className="root">
      <hr></hr>
      {
        earthquake.map((doc) => (
          <div className={`earthquake${doc.id}`}>
            <h1> earthquake{doc.id}</h1>
            <h2> location: {doc.location} </h2>
            <h2> magnitude: {doc.magnitude} </h2>
          </div>
        ))
      }
      <hr></hr>
      {
        electricity.map((last) => (
          <>
            {Object.entries(last.region).map(([region, attrs]) => (
              <div className={region}>
                <h1>{region}</h1>
                {Object.entries(attrs).map(([attr, val]) => (
                  <h2>{attr}: {val}</h2>
                ))}
              </div>
            ))}
            <div>
              <h1>Storage Rate: {last.storage_rate}</h1>
            </div>
          </>
        ))
      }
      <hr></hr>
      {
        reservoir.map((last) => (
          Object.entries(last).map(([reservoir, attrs]) => (
            <div className={reservoir}>
              <h1>{reservoir}</h1>
              {Object.entries(attrs).map(([attr, val]) => (
                <h2>{attr}: {val}</h2>
              ))}
            </div>
          ))
        ))
      }
    </div >
  );
}

export default App;
