import { useState } from "react"
import { FaClipboardList, FaUsers } from "react-icons/fa"
import { GiConverseShoe } from "react-icons/gi"
import { MdDashboard, MdLogout, MdSettings, MdMenu, MdClose } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("fullName")
    localStorage.clear()
    window.location.href = "/"
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <nav className="md:hidden bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <GiConverseShoe alt="ShoeCare Logo" className="mr-2 text-2xl text-blue-600" />
          <h1 className="text-xl font-bold text-blue-600">ShoeCare Admin</h1>
        </div>
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
        </button>
      </nav>

      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:relative md:w-64 h-screen`}
      >
        <div className="p-4 flex items-center">
          <GiConverseShoe alt="ShoeCare Logo" className="mr-2 text-2xl text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">ShoeCare Admin</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin/dashboard"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
              isActive("/admin/dashboard") ? "bg-gray-300" : "bg-white"
            }`}
          >
            <MdDashboard className="inline-block mr-2" /> Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
              isActive("/admin/orders") ? "bg-gray-300" : "bg-white"
            }`}
          >
            <FaClipboardList className="inline-block mr-2" /> Pesanan
          </Link>
          <Link
            to="/admin/customers"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
              isActive("/admin/customers") ? "bg-gray-300" : "bg-white"
            }`}
          >
            <FaUsers className="inline-block mr-2" /> Pelanggan
          </Link>
          <Link
            to="/admin/settings"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
              isActive("/admin/settings") ? "bg-gray-300" : "bg-white"
            }`}
          >
            <MdSettings className="inline-block mr-2" /> Pengaturan
          </Link>
        </nav>
        <div className="absolute md:bottom-0 bottom-12 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            <MdLogout className="inline-block mr-2" /> Keluar
          </button>
        </div>
      </aside>

      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}
    </>
  )
}

export default AdminSidebar
