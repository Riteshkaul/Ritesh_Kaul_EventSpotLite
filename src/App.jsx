import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";
import EventModal from "./components/EventModal";
import eventsData from "./data/events.json";
import Spinner from "./components/Spinner.jsx"; // Import the Spinner component

function App() {
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const handleSearch = (searchTerm) => setSearch(searchTerm);

  const filteredEvents = eventsData.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />

      {loading ? (
        <Spinner />
      ) : (
        <div className="event-list">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              ind={index}
              openModal={setSelectedEvent}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          closeModal={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default App;
