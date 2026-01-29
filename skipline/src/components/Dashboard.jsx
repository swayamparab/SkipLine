import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import './Dashboard.css'

const Dashboard = () => {
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
    <div>
      <h2>Welcome, {userData?.name || "Student"} 👋</h2>
    </div>
  );
};

export default Dashboard;
