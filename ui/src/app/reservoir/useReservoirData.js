import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase';

export default function useReservoirData() {
    const [reservoirData, setReservoirData] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'reservoir'), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setReservoirData(data);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    return reservoirData;
  }