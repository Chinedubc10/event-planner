// components/FinnishEventPlanner/EventForm.jsx
"use client";
import { emojiOptions } from "./constants";

const EventForm = ({
  formData,
  setFormData,
  editingId,
  isSubmitting,
  handleSubmit,
  resetForm,
  setEditingId,
  darkMode,
}) => (
  <div
    className={`lg:col-span-1 rounded-2xl shadow-xl p-6 h-fit ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <h2 className="text-2xl font-bold mb-6 border-b pb-3">
      {editingId ? "Edit Event" : "Create New Event"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1">Event Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full p-3 border rounded-lg ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-50 border-gray-300"
          }`}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date *</label>
          <input
            type="date"
            value={formData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`w-full p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className={`w-full p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows="3"
          className={`w-full p-3 border rounded-lg ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-50 border-gray-300"
          }`}
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Vibe</label>
          <select
            value={formData.emoji}
            onChange={(e) =>
              setFormData({ ...formData, emoji: e.target.value })
            }
            className={`w-full p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            <option value="">Select an emoji</option>
            {emojiOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value} {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
            className={`w-full p-3 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium transition-opacity flex justify-center items-center ${
            isSubmitting ? "opacity-80" : "hover:opacity-90"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {editingId ? "Updating..." : "Creating..."}
            </>
          ) : editingId ? (
            "Update Event"
          ) : (
            "Create Event"
          )}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              resetForm();
            }}
            className="bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  </div>
);

export default EventForm;
