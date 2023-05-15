import { useEffect, useState } from "react";
import { onSnapshot, doc, getFirestore, collection, getDoc, query, } from "firebase/firestore"
import db from "./firebase";

function App() {
  const [reservoirAlarmSeverity, setReservoirAlarmSeverity] = useState(0);
  const [reservoir, setReservoir] = useState([]);
  const alarmCollectionRef = collection(db, "alarm");
  const reservoirCollectionRef = collection(db, "reservoir");


  useEffect(() => {
    const readReservoir = async () => {
      const firestore = getFirestore()
      const docRef = doc(firestore, "reservoir", "last")
      const docSnap = await getDoc(docRef)

      const data = docSnap.exists() ? docSnap.data() : null

      if (data !== null && data !== undefined) {
        onSnapshot(reservoirCollectionRef, (snapshot) =>
          setReservoir(snapshot.docs.map(doc => ({ ...data, id: doc.id }))));
      }


    }
    // const getReservoir = async () => {
    //   onSnapshot(reservoirCollectionRef, (snapshot) =>
    //     setReservoir(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    // };

    // getReservoir();
    readReservoir();


  }, []);

  return (
    <div className="root">
      {reservoir.map((last) => (
        Object.entries(last).map(([reservoirID, reservoirAttrs]) => (
          <div className={reservoirID}>
            <h1>{reservoirID}</h1>
            {Object.entries(reservoirAttrs).map(([attr, val]) => (
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
