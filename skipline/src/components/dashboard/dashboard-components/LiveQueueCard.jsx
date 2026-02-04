import './LiveQueueCard.css';
const LiveQueueCard = ({ peopleInQueue, nowServing, avgServingTime }) => {
  return (
    <div className="live-queue-card">
      <div className="live-badge">
        <span className="live-dot"></span>
        <span className="live-text">LIVE QUEUE STATUS</span>
      </div>
      
      <div className="live-content">
        <div className="live-item">
          <span className="live-label">People In</span>
          <br />
          <span className="live-label">Queue: </span>
          <span className="live-value-red">{peopleInQueue}</span>
        </div>
        <div className="dashed-separator"></div>
        
        <div className="live-item">
          <span className="live-label">Now Serving: </span>
          <span className="live-value">{nowServing}</span>
        </div>
        <div className="dashed-separator"></div>
        
        <div className="live-item">
          <span className="live-label">Avg Serving</span>
          <br />
          <span className="live-label">Time: </span>
          <span className="live-value-green">{avgServingTime} min</span>
        </div>
      </div>
    </div>
  );
};
export default LiveQueueCard;