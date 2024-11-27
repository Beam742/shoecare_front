import React, { useState, useEffect } from "react"
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa"
import AdminSidebar from "../components/AdminSidebar"
import axios from "axios"

export default function AdminSettings() {
  const [services, setServices] = useState([])
  const [newService, setNewService] = useState({ name: "", price: "" })
  const [editingService, setEditingService] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/jasa`)
      setServices(response.data)
    } catch (error) {
      console.error("Failed to fetch services", error)
    }
  }

  const handleAddService = async () => {
    if (newService.name && newService.price) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/jasa`, {
          nama_jasa: newService.name,
          harga: newService.price,
        })
        fetchServices()
        setNewService({ name: "", price: "" })
        setIsAddModalOpen(false)
        alert("Service added successfully!")
      } catch (error) {
        alert("Failed to add service")
      }
    }
  }

  const handleEditService = async () => {
    if (editingService.name && editingService.price) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/jasa/${editingService.id}`, {
          nama_jasa: editingService.name,
          harga: editingService.price,
        })
        fetchServices()
        setEditingService(null)
        setIsEditModalOpen(false)
        alert("Service updated successfully!")
      } catch (error) {
        alert("Failed to update service")
      }
    }
  }

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/jasa/${id}`)
      fetchServices()
      alert("Service deleted successfully!")
    } catch (error) {
      alert("Failed to delete service")
    }
  }

  return (
    <div className="md:flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Pengaturan Admin</h1>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Kelola Layanan</h2>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 text-white px-1 py-2 rounded-md hover:bg-blue-600 text-base md:px-3 md:py-2 md:text-sm inline-flex items-center"
            >
              <FaPlus className="inline mr-2" />
              Tambah Layanan
            </button>
          </div>
          {/* Modal Tambah Layanan */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-4/5 sm:w-1/3">
                <h3 className="text-lg font-semibold mb-4">Tambah Layanan Baru</h3>
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder="Nama Layanan"
                    className="px-3 py-2 border rounded-md"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Harga"
                    className="px-3 py-2 border rounded-md"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsAddModalOpen(false)}
                      className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleAddService}
                      className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Edit Layanan */}
          {isEditModalOpen && editingService && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-4/5 sm:w-1/3">
                <h3 className="text-lg font-semibold mb-4">Edit Layanan</h3>
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder="Nama Layanan"
                    className="px-3 py-2 border rounded-md"
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Harga"
                    className="px-3 py-2 border rounded-md"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleEditService}
                      className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Layanan Saat Ini</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-2 sm:px-4 text-left">Nama Layanan</th>
                  <th className="py-2 px-2 sm:px-4 text-left">Harga</th>
                  <th className="py-2 px-2 sm:px-4 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="py-2 px-2 sm:px-4">{service.nama_jasa}</td>
                    <td className="py-2 px-2 sm:px-4">{`Rp${service.harga}`}</td>
                    <td className="py-2 px-2 sm:px-4">
                      <button
                        onClick={() => {
                          setEditingService({ id: service.id, name: service.nama_jasa, price: service.harga })
                          setIsEditModalOpen(true)
                        }}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
