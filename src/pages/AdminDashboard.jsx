import React, { useState, useEffect } from "react"
import axios from "axios"
import { GiConverseShoe } from "react-icons/gi"
import { FaUsers, FaMoneyBillWave, FaClipboardList } from "react-icons/fa"
import AdminSidebar from "../components/AdminSidebar"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_orders: 0,
    total_customers: 0,
    total_revenue: 0,
    shoes_cleaned: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin-stats`)
        setStats(response.data)
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error)
      }
    }

    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/recent-orders`)
        setRecentOrders(response.data)
      } catch (error) {
        console.error("Failed to fetch recent orders", error)
      }
    }

    fetchStats()
    fetchRecentOrders()
  }, [])

  return (
    <div className="md:flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="bg-blue-500 rounded-full p-3 mr-4">
              <FaClipboardList className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.total_orders}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="bg-green-500 rounded-full p-3 mr-4">
              <FaUsers className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Customers</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.total_customers}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="bg-yellow-500 rounded-full p-3 mr-4">
              <FaMoneyBillWave className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">Rp {stats.total_revenue}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="bg-purple-500 rounded-full p-3 mr-4">
              <GiConverseShoe className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Shoes Cleaned</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.shoes_cleaned}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
            <Link to="/admin/orders" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 font-semibold">Order ID</th>
                  <th className="py-2 px-4 font-semibold">Customer</th>
                  <th className="py-2 px-4 font-semibold">Service</th>
                  <th className="py-2 px-4 font-semibold">Status</th>
                  <th className="py-2 px-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{order.inv_no}</td>
                    <td className="py-2 px-4">{order.customer}</td>
                    <td className="py-2 px-4">{order.service}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            order.status === "Completed"
                              ? "bg-green-200 text-green-800"
                              : order.status === "On Process"
                              ? "bg-yellow-200 text-yellow-800"
                              : order.status === "Pending"
                              ? "bg-gray-200 text-gray-800"
                              : order.status === "Accepted"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-red-200 text-red-800"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">Rp {order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
