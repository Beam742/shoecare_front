import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"
import Orders from "../components/Orders"
import { GiConverseShoe } from "react-icons/gi"
import { FaHistory, FaClipboardList, FaCreditCard } from "react-icons/fa"
import axios from "axios"

export default function UserDashboard() {
  const [stats, setStats] = useState({
    total_orders: 0,
    last_order_date: null,
    total_spent: 0,
    pending_orders: 0,
  })

  const fullName = localStorage.getItem("fullName") || "User"
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    fetchUserStats()
  }, [])

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-stats/${userId}`)
      setStats(response.data)
    } catch (error) {
      console.error("Failed to fetch user statistics", error)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Belum pernah"
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(dateString))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Welcome, {fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={GiConverseShoe} title="Total Orders" value={stats.total_orders} color="bg-blue-500" />
          <StatCard
            icon={FaHistory}
            title="Last Order"
            value={formatDate(stats.last_order_date)}
            color="bg-green-500"
          />
          <StatCard icon={FaClipboardList} title="Pending Orders" value={stats.pending_orders} color="bg-yellow-500" />
          <StatCard
            icon={FaCreditCard}
            title="Total Spent"
            value={formatCurrency(stats.total_spent)}
            color="bg-purple-500"
          />
        </div>
        <Orders text={"Recent Orders"} />
      </main>
    </div>
  )
}
