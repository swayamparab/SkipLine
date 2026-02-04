import './BottomNav.css';
const BottomNav = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bottom-nav">
      <button
        onClick={() => onTabChange("home")}
        className={`nav-button ${activeTab === "home" ? "active" : ""}`}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="nav-label">Home</span>
      </button>
      
      <button
        onClick={() => onTabChange("profile")}
        className={`nav-button ${activeTab === "profile" ? "active" : ""}`}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="nav-label">Profile</span>
      </button>
    </nav>
  );
};
export default BottomNav;