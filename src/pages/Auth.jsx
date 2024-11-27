import React, { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"
import { GiConverseShoe } from "react-icons/gi"
import { Link } from "react-router-dom"

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-8 transition-all duration-500 ease-in-out transform">
          <Link className="flex justify-center items-center mb-2" to={"/"}>
            <GiConverseShoe alt="ShoeCare Logo" className="mr-2 text-2xl text-blue-600" />
            <span className="text-xl font-bold text-blue-600">ShoeCare</span>
          </Link>
          <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? "Selamat Datang" : "Buat Akun"}</h2>
          {isLogin ? <Login /> : <Register />}
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
          <button onClick={toggleForm} className="text-sm text-blue-600 hover:underline focus:outline-none">
            {isLogin ? "Belum punya akun? Buat akun" : "Sudah punya akun? Masuk"}
          </button>
        </div>
      </div>
    </div>
  )
}
