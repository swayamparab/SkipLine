import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

import Header from "./dashboard-components/Header";
import WelcomeSection from "./dashboard-components/WelcomeSection";
import ActionCards from "./dashboard-components/ActionCards";
import QueueStatusCard from "./dashboard-components/QueueStatusCard";
import LiveQueueCard from "./dashboard-components/LiveQueueCard";
import BottomNav from "./dashboard-components/BottomNav";

import "./Dashboard.css";
import "./variable.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [authReady, setAuthReady] = useState(false);

  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  const [queueMember, setQueueMember] = useState(null);
  const [queueInfo, setQueueInfo] = useState(null);

  const [loadingQueue, setLoadingQueue] = useState(true);

  const [peopleInQueue, setPeopleInQueue] = useState(0);
  const [yourPosition, setYourPosition] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  // derived state
  const canJoinQueue = queueInfo?.isOpen === true;

  // AUTH READY
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      setAuthReady(true);
    });
    return () => unsub();
  }, []);


  //CHECK ADMIN
  useEffect(() => {
    if (!authReady || !auth.currentUser) return;

    const ref = doc(db, "admins", auth.currentUser.uid);

    const unsub = onSnapshot(ref, (snap) => {
      setIsAdmin(snap.exists() && snap.data().role === "admin");
    });

    return () => unsub();
  }, [authReady]);


  // JOIN QUEUE
  const handleJoinQueue = async () => {
    try {
      if (!auth.currentUser || !userData?.name) return;

      const queueRef = doc(db, "queue", "canteen");
      const memberRef = doc(db, "queueMembers", auth.currentUser.uid);

      await runTransaction(db, async (transaction) => {
        // already in queue
        const memberSnap = await transaction.get(memberRef);
        if (memberSnap.exists()) {
          throw new Error("Already in queue");
        }

        // read queue status
        const queueSnap = await transaction.get(queueRef);
        if (!queueSnap.exists()) {
          throw new Error("Queue not available");
        }

        const queueData = queueSnap.data();

        // admin closed queue
        if (!queueData.isOpen) {
          throw new Error("Queue is currently closed");
        }

        const nextToken = (queueData.lastTokenIssued || 0) + 1;

        transaction.update(queueRef, {
          lastTokenIssued: nextToken,
          updatedAt: serverTimestamp(),
        });

        transaction.set(memberRef, {
          username: userData.name,
          token: nextToken,
          joinedAt: serverTimestamp(),
        });
      });
    } catch (err) {
      alert(err.message);
    }
  };

  // LEAVE QUEUE (always allowed)
  const handleLeaveQueue = async () => {
    try {
      if (!auth.currentUser) return;
      if (!window.confirm("Leave the queue?")) return;

      await deleteDoc(doc(db, "queueMembers", auth.currentUser.uid));
    } catch {
      alert("Failed to leave queue");
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  // FETCH USER
  useEffect(() => {
    if (!authReady || !auth.currentUser?.uid) return;

    const fetchUser = async () => {
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setUserData(snap.data());
    };

    fetchUser();
  }, [authReady]);

  // USER + QUEUE LISTENERS
  useEffect(() => {
    if (!authReady || !auth.currentUser?.uid) return;

    const memberRef = doc(db, "queueMembers", auth.currentUser.uid);
    const queueRef = doc(db, "queue", "canteen");

    const unsubMember = onSnapshot(memberRef, (snap) => {
      setQueueMember(snap.exists() ? snap.data() : null);
    });

    const unsubQueue = onSnapshot(queueRef, (snap) => {
      if (snap.exists()) setQueueInfo(snap.data());
    });

    setLoadingQueue(false);

    return () => {
      unsubMember();
      unsubQueue();
    };
  }, [authReady]);

  // LIVE QUEUE (READ ONLY)
  useEffect(() => {
    if (!authReady) return;

    const unsub = onSnapshot(collection(db, "queueMembers"), (snap) => {
      setPeopleInQueue(snap.size);

      if (!queueMember) {
        setYourPosition(null);
        return;
      }

      let ahead = 0;
      snap.docs.forEach((d) => {
        if (d.data().token < queueMember.token) ahead++;
      });

      setYourPosition(ahead + 1);
    });

    return () => unsub();
  }, [authReady, queueMember]);

  if (loadingQueue) {
    return <div style={{ color: "white" }}>Loading queue...</div>;
  }

  return (
    <div
      className="app-container dashboard-theme"
      style={{ backgroundColor: "#1d1d1d" }}
    >
      <button className="logoutBtn" onClick={handleLogout}>
        Log out
      </button>

      {isAdmin && (
        <button className="logoutBtn" onClick={() => navigate("/admin")}>
          Admin
        </button>
      )}

      <div className="app-content">
        <Header />
        <WelcomeSection />

        <ActionCards
          estimatedTime={peopleInQueue * 1.5}
          onJoinQueue={queueMember ? handleLeaveQueue : handleJoinQueue}
          disabled={!userData || (!queueMember && !canJoinQueue)}
          label={queueMember ? "LEAVE QUEUE" : "JOIN QUEUE"}
        />

        {/* Queue closed message */}
        {!queueMember && queueInfo && !queueInfo.isOpen && (
          <p
            style={{
              color: "#ff6b6b",
              marginTop: "0.5rem",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            Queue is currently closed by admin
          </p>
        )}

        <LiveQueueCard
          peopleInQueue={peopleInQueue}
          nowServing={queueInfo?.currentServing ?? "—"}
          avgServingTime={1.5}
        />

        {queueMember && yourPosition && (
          <QueueStatusCard
            token={queueMember.token}
            position={yourPosition}
            estimatedWait={yourPosition * 1.5}
          />
        )}

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Dashboard;
