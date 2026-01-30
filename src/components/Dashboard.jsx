import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import './Dashboard.css'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/', {replace: true});

    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="dashDiv">
      <h2 style={{color: 'white'}}>Welcome, {userData?.name || "Student"} 👋</h2>
      <button className="logoutBtn" onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Dashboard;
