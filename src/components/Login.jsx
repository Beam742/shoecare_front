import React, { useState } from "react"
import { FaEnvelope, FaLock } from "react-icons/fa"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password })
      localStorage.setItem("userId", response.data.user.id)
      localStorage.setItem("fullName", response.data.user.full_name)
      localStorage.setItem("isAdmin", response.data.user.is_admin)
      if (response.data.user.is_admin) {
        window.location.href = "/admin/dashboard"
      } else {
        window.location.href = "/user/dashboard"
      }
    } catch (error) {
      alert("Login failed")
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10 sm:text-sm"
            placeholder="you@example.com"
          />
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10 sm:text-sm"
            placeholder="••••••••"
          />
          <FaLock className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default Login
