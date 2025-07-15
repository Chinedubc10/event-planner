"use client";

const Header = ({ darkMode, setDarkMode }) => (
  <header className="flex flex-col md:flex-row justify-between items-center mb-12">
    <div className="text-center md:text-left mb-6 md:mb-0">
      <h1 className="text-4xl font-bold mb-2 flex items-center justify-center md:justify-start">
        <span className="mr-3">🇫🇮</span>
        Finnish Event Planner
        <span className="ml-3">🇫🇮</span>
      </h1>
      <p className="text-lg opacity-80">Discover & organize local events</p>
    </div>

    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <span className="mr-2">Light</span>
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            darkMode ? "bg-indigo-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
              darkMode ? "translate-x-7" : ""
            }`}
          ></div>
        </div>
        <span className="ml-2">Dark</span>
      </div>
    </div>
  </header>
);

export default Header;
