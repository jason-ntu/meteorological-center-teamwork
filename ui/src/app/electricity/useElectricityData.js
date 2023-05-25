
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase';

export default function useElectricityData() {
    const [electricityData, setElectricityData] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'electricity'), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setElectricityData(data);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    return electricityData;
}