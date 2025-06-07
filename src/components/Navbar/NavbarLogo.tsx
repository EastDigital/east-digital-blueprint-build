import React from 'react';

export const NavbarLogo = () => {
  return (
    <div className="flex-shrink-0">
      <a href="/">
        {/* MODIFIED: Reduced logo height from h-[54px] to h-9 and set width to auto */}
        <img 
          src="https://eastdigital.in/img/logo-east-digital.png" 
          alt="East Digital" 
          className="h-9 w-auto"
        />
      </a>
    </div>
  );
};