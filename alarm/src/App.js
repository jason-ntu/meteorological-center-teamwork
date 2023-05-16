import { useEffect, useState } from "react";
import { onSnapshot, query, where, doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import db from "./firebase";
import { Collection, Service, Severity } from "./enum";
import { analyzeReservior } from "./reservoir";
import { analyzeEarthquake } from "./earthquake";

function App() {
  const alarmsCollectionRef = collection(db, Collection.ALARMS);
  const earthquakeCollectionRef = collection(db, Collection.EARTHQUAKE);
  const reservoirCollectionRef = collection(db, Collection.RESERVIOR);
  const [earthquake, setEarthquake] = useState([]);
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

    const readReservoir = async () => {
      console.log("readReservoir");
      onSnapshot(reservoirCollectionRef, (snapshot) => {
        setReservoir(snapshot.docs.map(doc => doc.data()));
        snapshot.docs.map((doc) => detectReservior(doc.data()));
      });
    }

    return () => {
      // readEarthquake();
      // readReservoir();
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
      <hr></hr>
    </div>
  );
}

// function App() {
//   const [newName, setNewName] = useState("");
//   const [newAge, setNewAge] = useState(0);
//   const [users, setUsers] = useState([]);
//   const usersCollectionRef = collection(db, 'users');

//   const createUser = async () => {
//     await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
//   }

//   const updateUser = async (id, age) => {
//     const userDoc = doc(db, "users", id)
//     const newFields = { age: age + 1 };
//     await updateDoc(userDoc, newFields);
//   }

//   const deleteUser = async (id) => {
//     const userDoc = doc(db, "users", id)
//     await deleteDoc(userDoc);

//   }

//   useEffect(() => {
//     const getUsers = async () => {
//       onSnapshot(usersCollectionRef, (snapshot) =>
//         setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
//     };

//     getUsers();
//   }, []);



//   return (
//     <div className="root">
//       <input
//         placeholder="Name..."
//         onChange={(event) => {
//           setNewName(event.target.value);
//         }}
//       />
//       <input
//         type="number"
//         placeholder="Age..."
//         onChange={(event) => {
//           setNewAge(event.target.value);
//         }}
//       />
//       <button onClick={createUser}> Create User</button>
//       {users.map((user) => {
//         return (
//           <div>
//             {" "}
//             <h1>Name: {user.name}</h1>
//             <h1>Age: {user.age}</h1>
//             <button
//               onClick={() => {
//                 updateUser(user.id, user.age);
//               }}
//             >
//               {" "}
//               Increase Age
//             </button>
//             <button
//               onClick={() => {
//                 deleteUser(user.id);
//               }}>
//               Delete User
//             </button>
//           </div>
//         );
//       })}
//     </div >
//   );
// }

export default App;
