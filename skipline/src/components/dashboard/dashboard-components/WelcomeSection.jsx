import './WelcomeSection.css';

import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const WelcomeSection = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.currentUser) return;

      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No user document found");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="welcome-section">
      <h2 className="welcome-title" style={{color: 'white'}}>Welcome, {userData?.name || "Student"} 👋</h2>
      <p className="welcome-text">
        Join the queue in seconds and track your waiting time.
        <br />
        No crowd! No confusion! Just smooth service!
      </p>
    </div>
  );
};
export default WelcomeSection;