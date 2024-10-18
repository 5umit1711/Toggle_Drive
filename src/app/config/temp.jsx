import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-2">
          <span className="text-red-500 text-xl font-bold">nav</span>
          <span className="text-black text-xl font-bold">gurukul</span>
        </div>

        <nav className="hidden md:flex space-x-6 text-gray-700">
          <div className="group relative">
            <button className="hover:text-black">About Us</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Our Team</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Our Mission</a>
            </div>
          </div>
          
          <div className="group relative">
            <button className="hover:text-black">School</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Courses</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Admissions</a>
            </div>
          </div>
          
          <div className="group relative">
            <button className="hover:text-black">Digital Initiatives</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Programs</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Partners</a>
            </div>
          </div>

          <div className="group relative">
            <button className="hover:text-black">Get Involved</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg py-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Volunteer</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Donate</a>
            </div>
          </div>
        </nav>

        <div className="flex space-x-4">
          <button className="border border-red-500 text-red-500 py-1 px-4 rounded-md hover:bg-red-500 hover:text-white">Hire from Us</button>
          <button className="border border-red-500 text-red-500 py-1 px-4 rounded-md hover:bg-red-500 hover:text-white">CSR Enquiries</button>
          <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600">Donate</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
