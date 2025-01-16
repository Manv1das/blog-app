import React from "react";

const BottomBar = () => {
  return (
    <div className="bg-gray-900 text-white py-4 px-5 flex items-center justify-center gap-4">
      {/* Left Rocket */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="orange"
        width="30"
        height="30"
        className="rocket"
      >
        <path d="M12 2a4 4 0 014 4v1h1a3 3 0 013 3v2l-3 3-3-3-3 3-3-3-3 3-3-3V9a3 3 0 013-3h1V6a4 4 0 014-4zm0 2a2 2 0 00-2 2v1h4V6a2 2 0 00-2-2zm-4 5l2 2-2 2-2-2 2-2zm8 0l2 2-2 2-2-2 2-2zm-6 6h4v2a2 2 0 11-4 0v-2zM3 19h2v3H3v-3zm16 0h2v3h-2v-3zM8 19h8v2a2 2 0 01-2 2H10a2 2 0 01-2-2v-2z" />
      </svg>

      {/* Center Text */}
      <h2 className="text-2xl font-bold text-center">Have fun with Fooorum</h2>

      {/* Right Rocket */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="orange"
        width="30"
        height="30"
        className="rocket"
      >
        <path d="M12 2a4 4 0 014 4v1h1a3 3 0 013 3v2l-3 3-3-3-3 3-3-3-3 3-3-3V9a3 3 0 013-3h1V6a4 4 0 014-4zm0 2a2 2 0 00-2 2v1h4V6a2 2 0 00-2-2zm-4 5l2 2-2 2-2-2 2-2zm8 0l2 2-2 2-2-2 2-2zm-6 6h4v2a2 2 0 11-4 0v-2zM3 19h2v3H3v-3zm16 0h2v3h-2v-3zM8 19h8v2a2 2 0 01-2 2H10a2 2 0 01-2-2v-2z" />
      </svg>
    </div>
  );
};

export default BottomBar;
