import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

import Header from "./dashboard-components/Header";
import WelcomeSection from "./dashboard-components/WelcomeSection";
import ActionCards from "./dashboard-components/ActionCards";
import QueueStatusCard from "./dashboard-components/QueueStatusCard";
import LiveQueueCard from "./dashboard-components/LiveQueueCard";
import BottomNav from "./dashboard-components/BottomNav";
import './Dashboard.css'
import './variable.css'

const Dashboard = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const [activeTab, setActiveTab] = useState("home");
  const [hasJoined, setHasJoined] = useState(true);

  const handleJoinQueue = () => {
        setHasJoined(true);
        alert("You've joined the queue! Your token number is 01");
  };

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
    <div className="app-container dashboard-theme" style={{backgroundColor: '#1d1d1d'}}>
         <button className="logoutBtn" onClick={handleLogout}>Log out</button>
      <div className="app-content">
        <Header />
        <WelcomeSection />
        <ActionCards estimatedTime={10} onJoinQueue={handleJoinQueue} />
        
        {hasJoined && (
          <div className="status-grid">
            <QueueStatusCard
              token="01"
              position={5}
              estimatedWait={5}
            />
            <LiveQueueCard
              peopleInQueue={18}
              nowServing="01"
              avgServingTime={1.5}
            />
          </div>
        )}
        
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Dashboard;
