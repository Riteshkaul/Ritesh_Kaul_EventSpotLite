import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const EventCard = ({ event, openModal, ind }) => {
  const cardRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: -50,
        y: 50,
        scale: 0.85,
        boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
        delay: ind * 0.1, // Small delay for each card to create a staggered effect
      }
    );
  }, [ind]);

  const handleHover = (scale) => {
    gsap.to(cardRef.current, {
      scale: scale,
      duration: 0.3,
      ease: "power3.inOut",
      boxShadow:
        scale === 1.02
          ? "0px 15px 25px rgba(0, 0, 0, 0.2)"
          : "0px 10px 20px rgba(0, 0, 0, 0.15)",
    });
  };

  const handleClick = () => {
    setIsClicked(true);
    gsap.to(cardRef.current, {
      scale: 0.95, // Briefly shrink the card on click
      duration: 0.15,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.to(cardRef.current, { scale: 1, duration: 0.15 }); // Return to original scale
        openModal(event); // Open the modal after animation
      },
    });
    setTimeout(() => setIsClicked(false), 200); // Reset clicked state
  };

  return (
    <div
      ref={cardRef}
      className={`event-card ${ind === 0 ? "first-card" : ""} ${
        isClicked ? "clicked" : ""
      }`}
      onClick={handleClick}
      onMouseEnter={() => handleHover(1.02)}
      onMouseLeave={() => handleHover(1)}
    >
      <h3>{event.name}</h3>
      <p>
        {event.date} - {event.location}
      </p>
    </div>
  );
};

export default EventCard;
