import React from 'react';
import { NavDropdown } from './NavDropdown';
import { AnimatedHamburger } from './AnimatedHamburger';
import { NavbarLogo } from './NavbarLogo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { NavbarCTA } from './NavbarCTA';
import { useNavbarLogic } from './useNavbarLogic';
import { NavbarBackground } from './NavbarBackground';

export const Navbar = () => {
  const {
    isMenuOpen,
    isDropdownOpen,
    isScrolled,
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
      <NavbarBackground isHomePage={isHomePage} isScrolled={isScrolled} />

      <header className={`w-full font-poppins fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBackground()}`}>
        <div className="container mx-auto px-4">
          {/* MODIFIED: Increased vertical padding from py-2 back to py-5 */}
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
              showCtaAnimation={false}
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