const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className={`${color} rounded-full p-3 mr-4`}>
        <Icon className="text-white text-2xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default StatCard
