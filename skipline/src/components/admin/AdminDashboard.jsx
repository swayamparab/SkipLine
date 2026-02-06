import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./AdminDashboard.css";

const AVG_SERVE_TIME = 1.5; // minutes

export default function AdminDashboard() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const [queueStatus, setQueueStatus] = useState(null); 

  useEffect(() => {
    const ref = doc(db, "queue", "canteen");

    const unsub = onSnapshot(ref, (snap) => {
      setQueueStatus(snap.data());
    });

    return () => unsub();
  }, []);


  useEffect(() => {
    const q = query(
      collection(db, "queueMembers"),
      orderBy("joinedAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const members = snapshot.docs.map((doc, index) => ({
        uid: doc.id,
        ...doc.data(),
        position: index + 1,
        eta: index * AVG_SERVE_TIME,
      }));

      setQueue(members);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleQueue = async () => {
    const ref = doc(db, "queue", "canteen");
    await updateDoc(ref, {
      isOpen: !queueStatus.isOpen,
      updatedAt: new Date(),
    });
  };

  const handleServe = async (uid) => {
    try {
      await deleteDoc(doc(db, "queueMembers", uid));
    } catch (err) {
      console.error("Serve failed:", err);
      alert("Failed to serve user");
    }
  };

  if (loading) return <p>Loading queue...</p>;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <span className="admin-badge">ADMIN</span>
      </header>

      {/* Queue meta */}
      <button className="toggle-btn" onClick={toggleQueue}>
        {queueStatus?.isOpen ? "Close Queue" : "Open Queue"}
      </button>

      <div className="admin-queue-card">
        <div className="live-badge">
          <span className="live-dot" />
          <span className="live-text">LIVE QUEUE</span>
        </div>

        <div className="live-content">
          <div className="live-item">
            <span className="live-label">People in Queue</span>
            <span className="live-value-red">{queue.length}</span>
          </div>
        </div>
      </div>

      {/* Queue list */}
      <div className="queue-list">
        {queue.length === 0 && <p>No one in queue</p>}

        {queue.map((user) => (
          <div key={user.uid} className="queue-card">
            <div>
              <p className="queue-name">
                {user.position}. {user.username}
              </p>
              <p className="queue-eta">ETA: {user.eta} min</p>
            </div>

            <button
              className="serve-btn"
              onClick={() => handleServe(user.uid)}
            >
              Serve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
