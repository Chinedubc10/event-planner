"use client";
import { weatherIcons } from "./constants";

const EventCard = ({ event, weather, onEdit, onDelete, darkMode }) => {
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div
      className={`rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {event.image_url ? (
          <div className="md:w-1/3 h-56 md:h-auto">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className={`md:w-1/3 flex items-center justify-center text-9xl ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {event.emoji || "📅"}
          </div>
        )}

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center">
                <h3
                  className={`text-xl font-bold mr-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {event.title}
                </h3>
                {event.emoji && <span className="text-2xl">{event.emoji}</span>}
              </div>
              <div
                className={`flex items-center text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                {event.location}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(event)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {event.description}
          </p>

          <div
            className={`flex flex-wrap justify-between items-center pt-4 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`px-3 py-1 rounded-full font-medium ${
                  darkMode
                    ? "bg-indigo-900/30 text-indigo-300"
                    : "bg-indigo-100 text-black"
                }`}
              >
                {eventDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              {daysDiff >= 0 && (
                <div
                  className={`ml-3 px-3 py-1 rounded-full font-medium ${
                    daysDiff === 0
                      ? darkMode
                        ? "bg-green-900/30 text-green-300"
                        : "bg-green-100 text-black"
                      : darkMode
                      ? "bg-blue-900/30 text-blue-300"
                      : "bg-blue-100 text-black"
                  }`}
                >
                  {daysDiff === 0
                    ? "Today"
                    : `In ${daysDiff} day${daysDiff !== 1 ? "s" : ""}`}
                </div>
              )}
            </div>

            {weather && (
              <div className="flex items-center mt-2 sm:mt-0">
                <span className="text-2xl mr-2">
                  {weatherIcons[weather.weather[0].icon]}
                </span>
                <span>{Math.round(weather.main.temp)}°C</span>
                <span className="mx-2">•</span>
                <span className="capitalize">
                  {weather.weather[0].description}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
