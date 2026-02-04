import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-content">
          <span className="logo-initials">SL</span>
          <span className="logo-tagline">SkipLine<span className="logo-ai">AI</span></span>
        </div>
      </div>
      <div className="header-text">
        <h1 className="header-title">
          SkipLine<span className="title-accent">AI</span>
        </h1>
        <p className="header-subtitle">Smart Queue Management System</p>
      </div>
    </header>
  );
};
export default Header;