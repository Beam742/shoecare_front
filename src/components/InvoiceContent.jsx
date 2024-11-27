const InvoiceContent = ({ order }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Invalid Date"
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Intl.DateTimeFormat("id-ID", options).format(date)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <div className="bg-blue-500 text-white text-center py-6">
        <h1 className="text-3xl font-bold mb-2">ShoeCare Invoice</h1>
        <p>Invoice No. {order.inv_no}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-6 bg-gray-100">
        <div>
          <h3 className="text-lg font-semibold mb-2">Pelanggan:</h3>
          <p className="font-medium">{order.customerName}</p>
          <p className="text-gray-600">{order.customerEmail}</p>
          <p className="text-gray-600">{order.customerPhone}</p>
          <p className="text-gray-600">{order.customerAddress}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Detail Invoice:</h3>
          <p>Nama Sepatu: {order.nama_sepatu}</p>
          <p>Pemesanan: {formatDate(order.orderDate)}</p>
          <p>Dicetak: {formatDate(new Date().toISOString())}</p>
        </div>
      </div>

      <div className="p-6">
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left">Layanan</th>
              <th className="py-3 px-4 text-right">Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4">{order.service}</td>
              <td className="py-3 px-4 text-right">{formatCurrency(order.amount)}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right font-semibold text-xl text-blue-500">
          <p>Total: {formatCurrency(order.amount)}</p>
        </div>
      </div>

      <div className="bg-gray-100 text-center py-4">
        <p>Terima kasih atas kepercayaan Anda kepada kami!</p>
        <p>Ikuti kami di media sosial: @ShoeCareID untuk informasi lebih lanjut.</p>
      </div>
    </div>
  )
}

export default InvoiceContent
