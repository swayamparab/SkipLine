import './QueueStatusCard.css';
const QueueStatusCard = ({ token, position, estimatedWait }) => {
  return (
    <div className="queue-status-card">
      <div className="status-badge">
        <span className="badge-text">YOUR QUEUE STATUS</span>
      </div>
      
      <div className="status-content">
        <div className="status-item">
          <span className="status-label">Token: </span>
          <span className="status-value">{token}</span>
        </div>
        <div className="dashed-separator"></div>
        
        <div className="status-item">
          <span className="status-label">Position: </span>
          <span className="status-value">{position}</span>
        </div>
        <div className="dashed-separator"></div>
        
        <div className="status-item">
          <span className="status-label">Estimated wait: </span>
          <br />
          <span className="status-value-green">{estimatedWait} min</span>
        </div>
      </div>
    </div>
  );
};
export default QueueStatusCard;