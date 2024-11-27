import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa"
import { GiConverseShoe } from "react-icons/gi"
import { HiMenu as Menu, HiX as Close } from "react-icons/hi"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link className="flex justify-center items-center mb-2" to={"/"}>
          <GiConverseShoe alt="ShoeCare Logo" className="mr-2 text-2xl text-blue-600" />
          <span className="text-xl font-bold text-blue-600">ShoeCare</span>
        </Link>
        <button className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-6 w-6 text-gray-800" />
        </button>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/user/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/user/orders"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Pesanan
          </NavLink>
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Profil
          </NavLink>
          <button
            className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 flex items-center"
            onClick={() => {
              localStorage.removeItem("userId")
              localStorage.removeItem("fullName")
              localStorage.removeItem("isAdmin")
              window.location.href = "/"
            }}
          >
            <FaSignOutAlt className="mr-1" />
            Keluar
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 w-64 px-2`}
      >
        <button className="absolute top-4 right-4" onClick={toggleMenu}>
          <Close className="h-6 w-6 text-gray-800" />
        </button>
        <div className="flex flex-col items-center mt-16 space-y-4">
          <NavLink
            to="/user/dashboard"
            className={({ isActive }) =>
              `w-full text-center py-2 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
              }`
            }
            onClick={toggleMenu}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/user/orders"
            className={({ isActive }) =>
              `w-full text-center py-2 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
              }`
            }
            onClick={toggleMenu}
          >
            Pesanan
          </NavLink>
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `w-full text-center py-2 rounded-lg ${
                isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
              }`
            }
            onClick={toggleMenu}
          >
            Profil
          </NavLink>
          <button
            className="w-full text-center py-2 rounded-lg text-red-600 hover:bg-red-100 flex items-center justify-center"
            onClick={() => {
              localStorage.removeItem("userId")
              localStorage.removeItem("fullName")
              localStorage.removeItem("isAdmin")
              window.location.href = "/"
              toggleMenu()
            }}
          >
            <FaSignOutAlt className="mr-1" />
            Keluar
          </button>
        </div>
      </div>
    </nav>
  )
}
