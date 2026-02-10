import React from "react";
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import "./ProfileDrawer.css";

const ProfileDrawer = ({ isOpen, onClose, onLogout, isAdmin}) => {

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

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
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`profile-drawer ${isOpen ? "open" : ""}`}>

        <div className="drawer-header">
          <div className="user-info">
            <div className="avatar"></div>
            <div>
              <h3>{userData?.name || "student"}</h3>
              <p>{userData?.email || "student-email"}</p>
            </div>
          </div>
        </div>

        <div className="drawer-item">
          ⚙️ <span>Settings</span>
        </div>

        <div className="divider"></div>

        <div className="drawer-item">
          🔔 <span>Notifications</span>
        </div>

        <div className="divider"></div>

        <div className="drawer-item">
          ❓ <span>Help</span>
        </div>

        <div className="niche-ka-bar">
          <button
            className="logout-btn"
            onClick={onLogout}
          >
            Logout
          </button>

          {isAdmin && (
            <button className="logout-btn" onClick={() => navigate("/admin")}>
              Admin
            </button>
          )}
        </div>


      </div>
    </>
  );
};

export default ProfileDrawer;
