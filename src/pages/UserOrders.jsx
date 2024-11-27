import Navbar from "../components/Navbar"
import Orders from "../components/Orders"

export default function UserOrders() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pesanan Anda</h1>
        <Orders />
      </main>
    </div>
  )
}
