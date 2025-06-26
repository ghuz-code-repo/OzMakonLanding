import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../i18n';
import './Header.css';
import logoGoldenHouse from '../../assets/img/Header/logo-golden-house.svg';
import logoOzmakon from '../../assets/img/Header/logo-ozmakon.svg';
// import chevronDown from '../../assets/img/chevron-down.svg'; // если появится

const navKeys = [
  { key: 'main', href: '#' },
  { key: 'about', href: '#about' },
  { key: 'advantages', href: '#advantages' },
  { key: 'layouts', href: '#layouts' },
  { key: 'location', href: '#location' },
  { key: 'contacts', href: '#contacts' },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langRef = useRef();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1280);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!showLangDropdown) return;
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangDropdown]);

  const handleBurgerClick = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  const handleLangClick = () => setShowLangDropdown((v) => !v);
  const handleLangChange = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangDropdown(false);
    setMenuOpen(false);
  };

  const languages = supportedLanguages;
  const currentLang = i18n.language || 'ru';

  const LangDropdown = (
    <div className="header__lang-dropdown" ref={langRef}>
      <span className="header__lang-current" onClick={handleLangClick}>
        {t(`header.lang`, { lng: currentLang })}
        <svg className="header__lang-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="#CDDBE5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      {showLangDropdown && (
        <div className="header__lang-dropdown-list">
          {languages.map(lng => (
            <div
              key={lng}
              className={`header__lang-dropdown-item${currentLang === lng ? ' header__lang-dropdown-item--active' : ''}`}
              onClick={() => handleLangChange(lng)}
            >
              {t(`header.lang`, { lng })}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logos">
          <img src={logoGoldenHouse} alt="Golden House" className="header__logo-gh" />
          <span className="header__divider" />
          <img src={logoOzmakon} alt="Ozmakon" className="header__logo-ozmakon" />
        </div>
        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
          {navKeys.map(link => (
            <a key={link.key} href={link.href} className="header__nav-link" onClick={handleNavClick}>
              {t(`header.${link.key}`)}
            </a>
          ))}
          {isMobile && (
            <div className="header__lang header__lang--mobile">
              {LangDropdown}
            </div>
          )}
        </nav>
        {!isMobile && (
          <div className="header__lang">
            {LangDropdown}
          </div>
        )}
        <button className={`header__burger${menuOpen ? ' header__burger--open' : ''}`} onClick={handleBurgerClick} aria-label="Открыть меню">
          <span />
          <span />
          <span />
        </button>
      </div>
      {/* Мобильное меню-оверлей */}
      {menuOpen && <div className="header__nav-overlay" onClick={handleBurgerClick} />}
    </header>
  );
};

export default Header;
