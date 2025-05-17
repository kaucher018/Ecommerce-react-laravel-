import React from 'react'

import Navbar from '../Navbar/Navbar'
import DashbordSidebar from '../Common/DashbordSidebar';

const Dashboard = () => {
  

 

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-semibold mb-8">Dashboard</h2>
        <ul className="space-y-4">
          <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/categories")}>Categories</li>
          <li className="hover:text-blue-600 cursor-pointer">Brands</li>
          <li className="hover:text-blue-600 cursor-pointer">Products</li>
          <li className="hover:text-blue-600 cursor-pointer">Orders</li>
          <li className="hover:text-blue-600 cursor-pointer">Users</li>
          <li className="hover:text-blue-600 cursor-pointer">Shipping</li>
          <li className="hover:text-blue-600 cursor-pointer">Change Password</li>
          <li>
            <button 
              onClick={logout} 
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Logout
            </button>
          </li>
        </ul>
      </div> */}
      <DashbordSidebar/>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users Card */}
          <div className="bg-white shadow-md rounded-md p-6">
            <div className="text-3xl font-bold">1</div>
            <div className="text-gray-600">Users</div>
            <button className="mt-4 text-blue-500 hover:underline">
              View Users
            </button>
          </div>

          {/* Orders Card */}
          <div className="bg-white shadow-md rounded-md p-6">
            <div className="text-3xl font-bold">1</div>
            <div className="text-gray-600">Orders</div>
            <button className="mt-4 text-blue-500 hover:underline">
              View Orders
            </button>
          </div>

          {/* Products Card */}
          <div className="bg-white shadow-md rounded-md p-6">
            <div className="text-3xl font-bold">1</div>
            <div className="text-gray-600">Products</div>
            <button className="mt-4 text-blue-500 hover:underline">
              View Products
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard;
