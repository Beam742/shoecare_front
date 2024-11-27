import React, { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import axios from "axios"

const Orders = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [orderDetails, setOrderDetails] = useState({
    id_user: localStorage.getItem("userId") || "",
    nama_sepatu: "",
    id_jasa: "",
    total: "",
    bukti: null,
  })
  const [orders, setOrders] = useState([])
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchOrders()
    fetchServices()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${orderDetails.id_user}`)
      setOrders(response.data)
    } catch (error) {
      console.error("Failed to fetch orders", error)
    }
  }

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/jasa`)
      setServices(response.data)
    } catch (error) {
      console.error("Failed to fetch services", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrderDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setOrderDetails((prev) => ({ ...prev, bukti: e.target.files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(orderDetails).forEach((key) => {
      formData.append(key, orderDetails[key])
    })

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      alert("Order submitted successfully!")
      setIsOpen(false)
      fetchOrders()
    } catch (error) {
      alert("Failed to submit order")
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(dateString))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{text}</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Buat Pesanan
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-semibold">No. Invoice</th>
              <th className="py-2 px-4 font-semibold">Layanan</th>
              <th className="py-2 px-4 font-semibold">Status</th>
              <th className="py-2 px-4 font-semibold">Tanggal</th>
              <th className="py-2 px-4 font-semibold">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.inv_no} className="border-b border-gray-200">
                  <td className="py-2 px-4">{order.inv_no}</td>
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
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-200">
                <td colSpan="5" className="py-2 px-4 text-center bg-slate-200">
                  Tidak ada data pesanan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Buat Pesanan Anda</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div>
                  <label htmlFor="nama_sepatu" className="block text-sm font-medium text-gray-700">
                    Nama Sepatu
                  </label>
                  <input
                    type="text"
                    name="nama_sepatu"
                    value={orderDetails.nama_sepatu}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-10 pl-2"
                  />
                </div>
                <div>
                  <label htmlFor="id_jasa" className="block text-sm font-medium text-gray-700">
                    Layanan
                  </label>
                  <select
                    name="id_jasa"
                    value={orderDetails.id_jasa}
                    onChange={(e) => {
                      const selectedService = services.find((service) => service.id === parseInt(e.target.value))
                      setOrderDetails((prev) => ({
                        ...prev,
                        id_jasa: e.target.value,
                        total: selectedService ? selectedService.harga : "",
                      }))
                    }}
                    required
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-10"
                  >
                    <option value="">Pilih layanan</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.nama_jasa}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                    Total
                  </label>
                  <input
                    type="number"
                    name="total"
                    value={orderDetails.total}
                    disabled
                    className="mt-2 block w-full font-medium text-base border bg-slate-200 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-10 pl-2"
                  />
                </div>
                <div className="relative flex w-full p-3 pr-12 text-sm text-white bg-blue-500 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.75 9.75 0 0 0 12 2.25zm0 17.25a7.5 7.5 0 1 1 7.5-7.5 7.5 7.5 0 0 1-7.5 7.5zm0-13.5a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm0 3.75a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75z"
                    />
                  </svg>
                  Silakan transfer uang ke rekening BCA 7293619369 atas nama PT. ShoeCare.
                </div>
                <div>
                  <label htmlFor="bukti" className="block text-sm font-medium text-gray-700">
                    Bukti Pembayaran
                  </label>
                  <input
                    type="file"
                    name="bukti"
                    onChange={handleFileChange}
                    required
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Batal
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Buat Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders
