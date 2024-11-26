import React, { useState, useEffect } from "react"
import axios from "axios"
import AdminSidebar from "../components/AdminSidebar"
import { FaEye, FaEdit, FaDownload } from "react-icons/fa"
import InvoiceContent from "../components/InvoiceContent"
import html2pdf from "html2pdf.js"

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [printOrder, setPrintOrder] = useState(null)
  const [statusOptions, setStatusOptions] = useState([])
  const [newStatusId, setNewStatusId] = useState(null)
  const [isViewingProof, setIsViewingProof] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)

  useEffect(() => {
    fetchOrders()
    fetchStatusOptions()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`)
      setOrders(response.data)
      setFilteredOrders(response.data)
    } catch (error) {
      console.error("Failed to fetch orders", error)
    }
  }

  const fetchStatusOptions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/status`)
      setStatusOptions(response.data)
    } catch (error) {
      console.error("Failed to fetch status options", error)
    }
  }

  const openModal = (order, viewProof = false) => {
    setSelectedOrder(order)
    setIsViewingProof(viewProof)
  }

  const closeModal = () => {
    setSelectedOrder(null)
    setNewStatusId(null)
    setIsViewingProof(false)
  }

  const handleStatusChange = (e) => {
    setNewStatusId(e.target.value)
  }

  const updateOrderStatus = async () => {
    if (!newStatusId) {
      alert("Please select a new status.")
      return
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/orders/${selectedOrder.id}/status`, {
        id_status: newStatusId,
      })
      alert(response.data.message)
      fetchOrders() // Refresh orders after update
      closeModal()
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(dateString))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    filterOrders(e.target.value, filterStatus)
  }

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value)
    filterOrders(searchTerm, e.target.value)
  }

  const filterOrders = (search, status) => {
    let filtered = orders

    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.customer.toLowerCase().includes(search.toLowerCase()) ||
          order.inv_no.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status) {
      filtered = filtered.filter((order) => order.status === status)
    }

    setFilteredOrders(filtered)
  }

  const downloadInvoice = async (orderId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/${orderId}`)
      setPrintOrder(response.data) // Set data untuk cetak
      setIsPrintModalOpen(true) // Tampilkan modal cetak
    } catch (error) {
      console.error("Failed to download invoice", error)
    }
  }

  const printInvoice = () => {
    const input = document.getElementById("invoiceContent")
    if (input) {
      html2pdf()
        .from(input)
        .set({
          margin: 1,
          filename: `invoice_${printOrder.inv_no}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save()
        .then(() => {
          setIsPrintModalOpen(false) // Tutup modal setelah cetak
          setPrintOrder(null) // Reset setelah cetak
        })
    } else {
      console.error("Elemen invoiceContent tidak ditemukan!")
    }
  }

  return (
    <div className="md:flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Orders</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Sepatu untuk Dijemput</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 font-semibold">Invoice No</th>
                  <th className="py-2 px-4 font-semibold">Phone</th>
                  <th className="py-2 px-4 font-semibold">Service</th>
                  <th className="py-2 px-4 font-semibold">Alamat</th>
                  <th className="py-2 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) => order.status === "Accepted")
                  .map((order) => (
                    <tr key={order.id} className="border-b border-gray-200">
                      <td className="py-2 px-4">{order.inv_no}</td>
                      <td className="py-2 px-4">{order.customerPhone}</td>
                      <td className="py-2 px-4">{order.service}</td>
                      <td className="py-2 px-4">{order.customerAddress}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => openModal(order)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded h-10 text-sm w-40"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                {orders.filter((order) => order.status === "Accepted").length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 bg-gray-100">
                      Tidak ada sepatu yang perlu dijemput
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="overflow-x-auto">
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Search by Customer or Invoice No"
                value={searchTerm}
                onChange={handleSearch}
                className="flex-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
              />
              <select
                value={filterStatus}
                onChange={handleFilterStatus}
                className="flex-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
              >
                <option value="">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status.id} value={status.nama_status}>
                    {status.nama_status}
                  </option>
                ))}
              </select>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 font-semibold">Invoice No</th>
                  <th className="py-2 px-4 font-semibold">Customer</th>
                  <th className="py-2 px-4 font-semibold">Service</th>
                  <th className="py-2 px-4 font-semibold">Status</th>
                  <th className="py-2 px-4 font-semibold">Date</th>
                  <th className="py-2 px-4 font-semibold">Amount</th>
                  <th className="py-2 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
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
                    <td className="py-2 px-4">{formatDate(order.date)}</td>
                    <td className="py-2 px-4">{formatCurrency(order.amount)}</td>
                    <td className="py-2 px-4">
                      <button onClick={() => openModal(order, true)} className="text-blue-500 hover:text-blue-700 mr-2">
                        <FaEye />
                      </button>
                      <button onClick={() => openModal(order)} className="text-green-500 hover:text-green-700 mr-2">
                        <FaEdit />
                      </button>
                      <button onClick={() => downloadInvoice(order.id)} className="text-gray-500 hover:text-gray-700">
                        <FaDownload />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-h-screen overflow-y-auto">
              {isViewingProof ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Proof of Payment</h2>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${selectedOrder.bukti}`}
                    alt="Proof of Payment"
                    className="mb-4"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Edit Order Status</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select New Status:</label>
                    <select
                      value={newStatusId || ""}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      {statusOptions.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.nama_status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={updateOrderStatus}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                  >
                    Update Status
                  </button>
                </>
              )}
              <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Close
              </button>
            </div>
          </div>
        )}

        {isPrintModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-h-screen overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 text-center">Invoice</h2>
              <div id="invoiceContent" className="mb-4">
                <InvoiceContent order={printOrder} />
              </div>
              <button
                onClick={printInvoice}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Cetak Invoice
              </button>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
