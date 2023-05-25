import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase';

export default function useEarthquakeData() {
    const [earthquakeData, setEarthquakeData] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'earthquake'), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setEarthquakeData(data);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    return earthquakeData;
}