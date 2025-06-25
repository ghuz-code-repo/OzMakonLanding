import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-section">
      <nav className="navbar navbar-expand-lg ozmakon-navbar">
        <div className="container-fluid">
          <a className="navbar-brand ozmakon-logo-container" href="#"> {/* Changed class for clarity */}
            {/* GOLDEN HOUSE Logo Image */}
            <img src="/img/golden-house-logo.png" alt="Golden House Logo" className="logo-image golden-house-img" />
            <span className="logo-separator"></span> {/* Content removed, will be styled as a line */}
            {/* O'ZMAKON Business Logo Image */}
            <img src="/img/ozmakon-logo.png" alt="O'zmakon Business Logo" className="logo-image ozmakon-img" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span> {/* Consider styling this for better visibility on dark bg */}
          </button>
          <div className="collapse navbar-collapse ozmakon-menu-collapse" id="navbarNav">
            <ul className="navbar-nav ozmakon-menu">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Главная</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#conception" >О комплексе</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#apartments">Преимущества</a>
              </li>
              <li className="nav-item">
                {/* The image shows "Планировка", your previous code had "Apartments" linked to #apartments */}
                {/* Assuming "Планировка" is "Layouts/Plans" and might be the same as #apartments or a new section */}
                <a className="nav-link" href="#apartments">Планировка</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#location">Локация</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Контакты</a>
              </li>
            </ul>
            <div className="ozmakon-language-switcher">
              <a href="#" className="nav-link dropdown-toggle" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                RU
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                <li><a className="dropdown-item" href="#">RU</a></li>
                <li><a className="dropdown-item" href="#">EN</a></li>
                <li><a className="dropdown-item" href="#">UZ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
