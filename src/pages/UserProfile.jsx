import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function UserProfile() {
  const [customerInfo, setCustomerInfo] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-profile/${userId}`)
      setCustomerInfo(response.data)
    } catch (error) {
      console.error("Failed to fetch user profile", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/user-profile/${userId}`, customerInfo)
      alert("Profil berhasil diubah!")
      setIsEditing(false)
    } catch (error) {
      alert("Gagal mengubah profil")
    }
  }

  const handlePasswordChange = async () => {
    if (!passwordInfo.newPassword || !passwordInfo.confirmNewPassword) {
      alert("Kata sandi baru dan konfirmasi kata sandi tidak boleh kosong")
      return
    }
    if (passwordInfo.newPassword !== passwordInfo.confirmNewPassword) {
      alert("Kata sandi baru dan konfirmasi kata sandi tidak cocok")
      return
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/change-password/${userId}`, passwordInfo)
      alert("Kata sandi berhasil diubah!")
      setPasswordInfo({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      })
    } catch (error) {
      alert("Gagal mengubah kata sandi")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <div className="flex flex-col items-center md:space-x-4 mb-4 md:flex-row md:items-start">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-2xl font-semibold">
                {customerInfo.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="text-center md:text-left mt-2 md:mt-0">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{customerInfo.full_name}</h2>
              <p className="text-sm text-gray-500">Selamat Datang di Profil Anda</p>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                className={`py-2 px-4 ${activeTab === "personal" ? "border-b-2 border-black" : "text-gray-600"}`}
                onClick={() => setActiveTab("personal")}
              >
                Informasi Pribadi
              </button>
              <button
                className={`py-2 px-4 ${activeTab === "security" ? "border-b-2 border-black" : "text-gray-600"}`}
                onClick={() => setActiveTab("security")}
              >
                Keamanan
              </button>
            </div>
          </div>

          {activeTab === "personal" && (
            <div className="mt-4">
              <form>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center md:gap-4">
                    <label className="md:text-right">Nama Lengkap</label>
                    <input
                      type="text"
                      name="full_name"
                      value={customerInfo.full_name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="md:col-span-3 border border-gray-300 rounded-md px-3 py-2 disabled:bg-slate-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center md:gap-4">
                    <label className="md:text-right">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="md:col-span-3 border border-gray-300 rounded-md px-3 py-2 disabled:bg-slate-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center md:gap-4">
                    <label className="md:text-right">Telepon</label>
                    <input
                      type="text"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="md:col-span-3 border border-gray-300 rounded-md px-3 py-2 disabled:bg-slate-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center md:gap-4">
                    <label className="md:text-right">Alamat</label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="md:col-span-3 border border-gray-300 rounded-md px-3 py-2 disabled:bg-slate-300"
                    />
                  </div>
                </div>
                {isEditing ? (
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Simpan
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit Profil
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center md:gap-4">
                  <label className="md:text-right">Kata Sandi Saat Ini</label>
                  <div className="md:col-span-3 relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordInfo.currentPassword}
                      onChange={(e) => setPasswordInfo((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-0 top-0 m-2"
                    >
                      {showCurrentPassword ? (
                        <AiOutlineEyeInvisible className="h-5 w-5" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 items-center md:gap-4">
                  <label className="md:text-right">Kata Sandi Baru</label>
                  <div className="md:col-span-3 relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordInfo.newPassword}
                      onChange={(e) => setPasswordInfo((prev) => ({ ...prev, newPassword: e.target.value }))}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-0 top-0 m-2"
                    >
                      {showNewPassword ? (
                        <AiOutlineEyeInvisible className="h-5 w-5" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 items-center md:gap-4">
                  <label className="md:text-right">Konfirmasi Kata Sandi</label>
                  <div className="md:col-span-3 relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      value={passwordInfo.confirmNewPassword}
                      onChange={(e) => setPasswordInfo((prev) => ({ ...prev, confirmNewPassword: e.target.value }))}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-0 top-0 m-2"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible className="h-5 w-5" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Ganti Kata Sandi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
