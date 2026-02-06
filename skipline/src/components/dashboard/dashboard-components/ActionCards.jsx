import './ActionCards.css';
const ActionCards = ({ estimatedTime, onJoinQueue, disabled, label }) => {
  return (
    <div className="action-cards">
      <button onClick={onJoinQueue} disabled={disabled} className="join-queue-card">
        <div className="users-icon-container">
          <svg className="users-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <div className="pulse-indicator">
            <div className="pulse-dot"></div>
          </div>
        </div>
        <span className="join-queue-text">{label}</span>
      </button>
      <div className="estimated-time-card">
        <div className="time-display">
          <svg className="clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="time-value">{estimatedTime} min</span>
        </div>
        <div className="time-label">
          <span>ESTIMATED</span>
          <br />
          <span>WAITING TIME</span>
        </div>
      </div>
    </div>
  );
};
export default ActionCards;