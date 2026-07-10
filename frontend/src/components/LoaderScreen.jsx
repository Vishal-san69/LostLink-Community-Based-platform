import React from "react";

function LoaderScreen() {
  return (
    <div className="fixed inset-0 bg-slate-100 flex items-center justify-center z-50">

      <div className="text-center">

        {/* Logo */}

        <div className="relative mx-auto w-24 h-24">

          <div className="absolute inset-0 rounded-full border-4 border-slate-300"></div>

          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>

          <div className="absolute inset-0 flex items-center justify-center">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="10" cy="10" r="6" />
              <line x1="14.5" y1="14.5" x2="20" y2="20" />
            </svg>

          </div>

        </div>

        <h2 className="text-3xl font-bold mt-8">
          <span className="text-indigo-600">Lost</span>
          <span className="text-slate-800">Link</span>
        </h2>

        <p className="text-slate-600 mt-3 font-medium">
          Loading your dashboard...
        </p>

        <p className="text-slate-400 text-sm mt-1">
          Please wait while we fetch your latest data.
        </p>

      </div>

    </div>
  );
}

export default LoaderScreen;