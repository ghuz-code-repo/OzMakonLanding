import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../i18n';
import { useEventListener, useDebounce } from '../../hooks/useEventListener';
import styles from'./Header.module.css';
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

  // --- Оптимизированная логика для скрытия/появления хедера ---
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(window.pageYOffset);
  const ticking = useRef(false);

  useEffect(() => {
    // Инициализация начального положения скролла
    lastScrollY.current = window.pageYOffset;
  }, []);

  const handleScroll = () => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY <= 0) {
          // Когда страница в самом верху
          setShowHeader(true);
        } else if (currentScrollY < lastScrollY.current) {
          // Скролл вверх
          setShowHeader(true);
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Скролл вниз и прошли первые 100px
          setShowHeader(false);
        }
        
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      
      ticking.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Оптимизированная проверка мобильного устройства ---
  const checkMobile = useDebounce(() => {
    setIsMobile(window.innerWidth <= 1280);
  }, 250);

  useEffect(() => {
    checkMobile();
  }, []);

  useEventListener('resize', checkMobile, window, { passive: true });

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

  const handleLangClick = ()=> setShowLangDropdown((v) => !v);
  // (console.log('Potom reliznem'));

  const handleLangChange = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangDropdown(false);
    setMenuOpen(false);
  };

  const languages = supportedLanguages;
  const currentLang = i18n.language || 'ru';

  const LangDropdown = (
    <div className={styles["header__lang-dropdown"]} ref={langRef}>
      <span className={styles["header__lang-current"]} onClick={handleLangClick}>
        {t(`header.lang`, { lng: currentLang })}
        <svg className={styles["header__lang-chevron"]} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="#CDDBE5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      {showLangDropdown && (
        <div className={styles["header__lang-dropdown-list"]}>
          {languages.map(lng => (
            <div
              key={lng}
              className={styles["header__lang-dropdown-item"]+(currentLang === lng ? ' '+styles['header__lang-dropdown-item--active'] : '')}
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
    <header className={styles["header"]+(showHeader ? '' : " "+styles['header--hidden'])} style={{width: menuOpen ? "100%" : ""}}>
      <div className={styles["header__container"]}>
        <div className={styles["header__logos"]}>
          <img src={logoGoldenHouse} alt="Golden House" className={styles["header__logo-gh"]} />
          <span className={styles["header__divider"]} />
          <img src={logoOzmakon} alt="Ozmakon" className={styles["header__logo-ozmakon"]} />
        </div>
        <nav className={styles["header__nav"]+(menuOpen ? ' '+styles['header__nav--open'] : '')}>
          {navKeys.map(link => (
            <a key={link.key} href={link.href} className={styles["header__nav-link"]} onClick={handleNavClick}>
              {t(`header.${link.key}`)}
            </a>
          ))}
          {isMobile && (
            <div className={styles["header__lang"]+" "+styles["header__lang--mobile"]}>
              {LangDropdown}
            </div>
          )}
        </nav>
        {!isMobile && (
          <div className={styles["header__lang"]}>
            {LangDropdown}
          </div>
        )}
        <button className={styles["header__burger"]+(menuOpen ? ' '+styles["header__burger--open"] : '')} onClick={handleBurgerClick} aria-label="Открыть меню">
          <span />
          <span />
          <span />
        </button>
      </div>
      {/* Мобильное меню-оверлей */}
      {menuOpen && <div className={styles["header__nav-overlay"]} onClick={handleBurgerClick} />}
    </header>
  );
};

export default Header;
