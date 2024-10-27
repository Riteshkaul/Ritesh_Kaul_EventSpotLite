import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const EventModal = ({ event, closeModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      onComplete: closeModal,
    });
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="close-btn">
          X
        </button>
        <h2>{event.name}</h2>
        <p>
          {event.date} - {event.location}
        </p>
        <p>{event.description}</p>
        <img src={event.image} alt={event.name} />
      </div>
    </div>
  );
};

export default EventModal;
