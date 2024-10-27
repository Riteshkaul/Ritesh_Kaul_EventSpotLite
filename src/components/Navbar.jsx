import React, { useState, useEffect, useRef } from "react";
import "../CSS/Navbar.css";
import { gsap } from "gsap";

const Navbar = ({ onSearch }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brandRef = useRef(null);
  const inputRef = useRef(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    // Animate the brand heading
    gsap.fromTo(
      brandRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animate the input box
    gsap.fromTo(
      inputRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const handleHeadingHover = () => {
    gsap.fromTo(
      brandRef.current,
      { scale: 1 },
      { scale: 1.2, duration: 0.2, ease: "power3.out", yoyo: true, repeat: 1 }
    );
  };

  return (
    <nav className="navbar">
      <div
        style={{ cursor: "pointer" }}
        ref={brandRef}
        className="navbar-brand"
        onMouseEnter={handleHeadingHover}
      >
        EventSpot Lite
      </div>

      <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          className="search-bar"
          placeholder="Search events..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <button ref={inputRef} className="menu-icon" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
};

export default Navbar;
