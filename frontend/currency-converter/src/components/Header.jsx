import React from 'react';
import '../styles/global.css'; 

import LogoImage from '../assets/KambioFlash.png'; 

function Header() {
  return (
    
    <div className="main-header-content"> 

      <img src={LogoImage} alt="DindinConverter Logo" className="logo-image" />
    </div>
  );
}

export function LoadingSpinner({ className = "" }) {
  return (
    <span className={`spinning-icon ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12A8 8 0 0116 6" stroke="#00ADEF" stroke-width="2" stroke-linecap="round"/>
      <path d="M16 6L15 2M16 6L12 5" stroke="#00ADEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

      <path d="M20 12A8 8 0 018 18" stroke="#8CD211" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 18L9 22M8 18L12 19" stroke="#8CD211" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    </span>
  );
}

export default Header;