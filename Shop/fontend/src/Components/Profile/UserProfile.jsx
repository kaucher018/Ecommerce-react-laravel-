import React from "react";
import Navbar from "../Navbar/Navbar";

import { AuthContext } from "../Context/AuthContext";

const UserProfile = () => {

  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar/>
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">My Account</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-teal-600 cursor-pointer font-medium">My Account</li>
            <li className="hover:text-teal-600 cursor-pointer">Orders</li>
            <li className="hover:text-teal-600 cursor-pointer">Change Password</li>
            <li className="hover:text-red-500 cursor-pointer">Logout</li>
          </ul>
        </div>

        {/* Profile Form */}
        <div className="md:col-span-3 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Ravi Singh"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="ravi@example.com"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">Address</label>
              <textarea
                rows="3"
                placeholder="Address"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone</label>
              <input
                type="text"
                placeholder="Phone"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">City</label>
              <input
                type="text"
                placeholder="City"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Zip</label>
              <input
                type="text"
                placeholder="Zip"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">State</label>
              <input
                type="text"
                placeholder="State"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="md:col-span-2 text-right mt-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
