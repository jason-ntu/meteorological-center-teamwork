import { useEffect, useState } from "react";
import { onSnapshot, doc, getFirestore, collection, getDoc, addDoc } from "firebase/firestore"
import db from "./firebase";

const Service = {
  EARTHQUAKE: "earthquake",
  ELECTRICITY: "electricity",
  RESERVIOR: "reservoir",
  ALARM: "alarms"
}

const Severity = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high"
};



function App() {
  const [reservoirAlarmSeverity, setReservoirAlarmSeverity] = useState(0);
  const [reservoir, setReservoir] = useState([]);
  const alarmsCollectionRef = collection(db, Service.ALARM);
  const reservoirCollectionRef = collection(db, Service.RESERVIOR);
  const firestore = getFirestore();

  // const updateOldAlarm = async (id, severity) => {
  //   const alarmDoc = doc(db, "alarms", id)
  //   const newFields = { severity: severity };
  //   await updateDoc(alarmDoc, newFields);
  // }

  const createAlarm = async (type, severity, description) => {
    console.log("createAlarm")
    // await addDoc(alarmsCollectionRef, { type: type, severity: severity, description: description, order: 1 });
  }

  const detectReservior = async (last) => {
    for (const [reservoir, attrs] of Object.entries(last)) {
      console.log(`${reservoir}.percentage: ` + attrs.percentage)
      const percentage = Number(attrs.percentage.replace("%", ""));
      let severity, description;
      if (percentage < 10) {
        severity = Severity.LOW;
        description = `The remaining water of ${reservoir} is below 10%`;
      }
      else if (percentage < 20) {
        severity = Severity.MEDIUM;
        description = `The remaining water of ${reservoir} is below 20%`;
      }
      else if (percentage < 30) {
        severity = Severity.HIGH;
        description = `The remaining water of ${reservoir} is below 30%`;
      }
      else if (percentage > 95) {
        severity = Severity.LOW;
        description = `The remaining water of ${reservoir} is over 95%`;
      }
      else {
        continue;
      }
      // updateOldAlarm()
      createAlarm(Service.RESERVIOR, severity, description)
    }
  }

  useEffect(() => {
    const readReservoir = async () => {
      onSnapshot(reservoirCollectionRef, (snapshot) =>
        setReservoir(snapshot.docs.map(doc => doc.data())));
    }

    const createReservoirAlarm = async () => {
      onSnapshot(reservoirCollectionRef, (snapshot) =>
        snapshot.docs.map(doc => detectReservior(doc.data())));
    }

    return () => {
      readReservoir();
      createReservoirAlarm();
    }
  }, []);

  return (
    <div className="root">
      {reservoir.map((last) => (
        Object.entries(last).map(([reservoir, attrs]) => (
          <div className={reservoir}>
            <h1>{reservoir}</h1>
            {Object.entries(attrs).map(([attr, val]) => (
              <h2>{attr}: {val}</h2>
            ))}
          </div>
        ))
      ))}
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
