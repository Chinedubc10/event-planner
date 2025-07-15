"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import EventForm from "./EventForm";
import EventCard from "./EventCard";
import EventMap from "./EventMap";
import { API_URL } from "./constants";
import { isWithinFiveDays, findForecastForDate } from "./utils";

const FinnishEventPlanner = () => {
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("");
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    emoji: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setEvents(data);
      fetchWeatherForEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchWeatherForEvents = async (events) => {
    const weather = {};
    for (const event of events) {
      if (isWithinFiveDays(event.date)) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${event.location}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
          );
          const forecast = findForecastForDate(response.data.list, event.date);
          if (forecast) weather[event.id] = forecast;
        } catch (error) {
          console.error("Weather fetch error:", error);
        }
      }
    }
    setWeatherData(weather);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      date: event.date.split("T")[0],
      location: event.location,
      description: event.description,
      emoji: event.emoji,
      image_url: event.image_url || "",
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
      emoji: "",
      image_url: "",
    });
  };

  const filteredEvents = events.filter(
    (event) =>
      event.location.toLowerCase().includes(filter.toLowerCase()) ||
      event.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <EventForm
            formData={formData}
            setFormData={setFormData}
            editingId={editingId}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            setEditingId={setEditingId}
            darkMode={darkMode}
          />

          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex space-x-2">
                <button
                  onClick={() => setView("list")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === "list"
                      ? "bg-indigo-600 text-white"
                      : darkMode
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === "map"
                      ? "bg-indigo-600 text-white"
                      : darkMode
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                >
                  Map View
                </button>
              </div>

              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search events..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            {view === "list" ? (
              <div className="space-y-5">
                {sortedEvents.length === 0 ? (
                  <div
                    className={`rounded-2xl shadow-lg p-8 text-center ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl font-semibold mb-2">
                      No events found
                    </h3>
                    <p className="text-gray-500">
                      Create your first event or adjust your search
                    </p>
                  </div>
                ) : (
                  sortedEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      weather={weatherData[event.id]}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      darkMode={darkMode}
                    />
                  ))
                )}
              </div>
            ) : (
              <EventMap events={events} darkMode={darkMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinnishEventPlanner;
