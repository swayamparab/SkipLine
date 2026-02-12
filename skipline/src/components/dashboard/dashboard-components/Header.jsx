import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img className='header-logo-img' src="/Logo.png" alt="" />
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