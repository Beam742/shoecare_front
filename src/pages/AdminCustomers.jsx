import React, { useState, useEffect } from "react"
import { FaSearch, FaFilter, FaUser, FaEdit, FaTrash } from "react-icons/fa"
import AdminSidebar from "../components/AdminSidebar"
import axios from "axios"

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [newCustomer, setNewCustomer] = useState({ full_name: "", email: "", phone: "", is_admin: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [customersPerPage] = useState(10)

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    handleSearch()
  }, [searchTerm, customers])

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
      setCustomers(response.data)
      setFilteredCustomers(response.data)
    } catch (error) {
      console.error("Failed to fetch customers", error)
    }
  }

  const handleSearch = () => {
    const filtered = customers.filter((customer) => customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCustomers(filtered)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleEditCustomer = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/users/${editingCustomer.id}`, editingCustomer)
      fetchCustomers()
      setEditingCustomer(null)
      setIsModalOpen(false)
      alert("Customer updated successfully!")
    } catch (error) {
      alert("Failed to update customer")
    }
  }

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`)
      fetchCustomers()
      alert("Customer deleted successfully!")
    } catch (error) {
      alert("Failed to delete customer")
    }
  }

  const openEditModal = (customer) => {
    setEditingCustomer(customer)
    setIsModalOpen(true)
  }

  const closeEditModal = () => {
    setEditingCustomer(null)
    setIsModalOpen(false)
  }

  // Get current customers
  const indexOfLastCustomer = currentPage * customersPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer)

  // Calculate page numbers
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredCustomers.length / customersPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="md:flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pelanggan</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pelanggan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 font-semibold">ID Pelanggan</th>
                  <th className="py-2 px-4 font-semibold">Nama</th>
                  <th className="py-2 px-4 font-semibold">Email</th>
                  <th className="py-2 px-4 font-semibold">Telepon</th>
                  <th className="py-2 px-4 font-semibold">Admin</th>
                  <th className="py-2 px-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{customer.id}</td>
                    <td className="py-2 px-4 flex items-center">
                      <FaUser className="mr-2 text-gray-400" />
                      {customer.full_name}
                    </td>
                    <td className="py-2 px-4">{customer.email}</td>
                    <td className="py-2 px-4">{customer.phone}</td>
                    <td className="py-2 px-4">{customer.is_admin ? "Ya" : "Tidak"}</td>
                    <td className="py-2 px-4">
                      {localStorage.getItem("userId") != customer.id && (
                        <>
                          <button
                            onClick={() => openEditModal(customer)}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <nav>
              <ul className="flex list-none">
                {pageNumbers.map((number) => (
                  <li key={number} className="mx-1">
                    <button
                      onClick={() => handlePageChange(number)}
                      className={`px-3 py-1 rounded ${
                        currentPage === number ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl max-h-screen overflow-y-auto mx-4">
              <h2 className="text-xl font-semibold mb-4">Edit Pelanggan</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={editingCustomer.full_name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, full_name: e.target.value })}
                  className="px-2 py-1 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="text"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                  className="px-2 py-1 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Telepon</label>
                <input
                  type="text"
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                  className="px-2 py-1 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Admin</label>
                <select
                  value={editingCustomer.is_admin}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, is_admin: e.target.value })}
                  className="px-2 py-1 border rounded-md w-full"
                >
                  <option value={0}>Tidak</option>
                  <option value={1}>Ya</option>
                </select>
              </div>
              <button
                onClick={handleEditCustomer}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Simpan
              </button>
              <button onClick={closeEditModal} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
