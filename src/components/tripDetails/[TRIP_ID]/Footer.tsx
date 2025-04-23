import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Enjoy Your <span className="text-blue-600">Trip</span> ✈️
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Wishing you safe travels and unforgettable memories
          </p>
          <div className="pt-4 border-t border-gray-200 w-full max-w-xs">
            <p className="text-gray-500 text-sm">
              Created with ❤️ by{' '}
              <a 
                href="https://github.com/renukakul" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Renuka Kulkarni
              </a>
            </p>
            <p className="text-gray-400 text-xs mt-2">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;