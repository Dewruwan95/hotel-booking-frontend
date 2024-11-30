import axios from "axios";
import { useEffect, useState } from "react";

function GalleryPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  // fetch events data
  async function fetchEvents() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/events/all"
      );

      setEvents(response.data.events);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load events.");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-[70px] lg:mt-[100px] xl:mt-[120px]">
      <div className="w-full min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
            Event Gallery
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div
                  style={{ backgroundImage: `url(${event.image})` }}
                  className="w-full h-48 bg-cover bg-center"
                ></div>

                <div className="p-4">
                  <h2 className="text-lg font-bold text-purple-600">
                    {event.name}
                  </h2>
                  <p className="text-gray-700 mt-2 text-sm">
                    {event.description.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
