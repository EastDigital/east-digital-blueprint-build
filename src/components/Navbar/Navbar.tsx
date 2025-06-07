import React from 'react';
import { NavDropdown } from './NavDropdown';
import { AnimatedHamburger } from './AnimatedHamburger';
import { NavbarBackground } from './NavbarBackground';
import { NavbarLogo } from './NavbarLogo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { NavbarCTA } from './NavbarCTA';
import { useNavbarLogic } from './useNavbarLogic';

export const Navbar = () => {
  const {
    isMenuOpen,
    isDropdownOpen,
    showCtaAnimation,
    isHomePage,
    dropdownContainerRef,
    mobileDropdownRef,
    toggleMenu,
    toggleDropdown,
    closeDropdown,
    handleExpertiseEnter,
    handleExpertiseLeave,
    handleMobileDropdownItemClick,
    getNavbarBackground,
  } = useNavbarLogic();

  return (
    <>
      {/* Gradient Animation Background - Only on Home Page */}
      {isHomePage && (
        <div className="fixed top-0 left-0 right-0 h-[400px] pointer-events-none z-40 bg-continuous-gradient" />
      )}

      <NavbarBackground isHomePage={isHomePage} />

      <header className={`w-full font-poppins fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBackground()}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-5">
            <NavbarLogo />
            
            <DesktopNav 
              isDropdownOpen={isDropdownOpen}
              onExpertiseEnter={handleExpertiseEnter}
              onExpertiseLeave={handleExpertiseLeave}
              onDropdownToggle={toggleDropdown}
              dropdownContainerRef={dropdownContainerRef}
            />

            <NavbarCTA 
              isHomePage={isHomePage}
              showCtaAnimation={showCtaAnimation}
            />

            <div className="lg:hidden">
              <AnimatedHamburger 
                isOpen={isMenuOpen}
                onClick={toggleMenu}
              />
            </div>
          </div>

          <MobileNav 
            isMenuOpen={isMenuOpen}
            isDropdownOpen={isDropdownOpen}
            onDropdownToggle={toggleDropdown}
            closeDropdown={closeDropdown}
            onMobileDropdownItemClick={handleMobileDropdownItemClick}
            mobileDropdownRef={mobileDropdownRef}
          />
        </div>

        {/* Desktop Dropdown positioned with seamless hover connection - FIXED: removed top gap */}
        <div
          onMouseEnter={handleExpertiseEnter}
          onMouseLeave={handleExpertiseLeave}
          className={`desktop-dropdown hidden lg:block absolute left-0 right-0 z-50 ${isDropdownOpen ? 'block' : 'hidden'}`}
          style={{ top: '100%' }}
        >
          <NavDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
        </div>
      </header>
    </>
  );
};

export default Navbar;