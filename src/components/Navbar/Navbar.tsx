import React, { useRef } from 'react';
import { NavDropdown } from './NavDropdown';
import { AnimatedHamburger } from './AnimatedHamburger';
import { NavbarLogo } from './NavbarLogo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { NavbarCTA } from './NavbarCTA';
import { useNavbarLogic } from './useNavbarLogic';
import { cn } from '@/lib/utils'; // Make sure cn is imported

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
    // Note: We no longer need getNavbarBackground
  } = useNavbarLogic();
  
  // This ref is for the improved click-outside logic we discussed earlier
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* This NavbarBackground component seems to not be in use or necessary, 
        as the header itself controls its background. You may consider removing it.
        I have left it here to match your last file structure.
      */}
      {/* <NavbarBackground isHomePage={isHomePage} isScrolled={isScrolled} /> */}

      <header 
        className={cn(
          "w-full font-poppins fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          // --- THIS IS THE FIX ---
          // When scrolled, apply a semi-transparent background WITHOUT backdrop-blur or a border.
          // This allows the dropdown's own glassmorphism to work correctly.
          isScrolled ? "bg-black/50" : "bg-transparent"
        )}
      >
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
          ref={desktopDropdownRef} // Attach the ref here
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