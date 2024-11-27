import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import Auth from "./pages/Auth.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import AdminOrders from "./pages/AdminOrders.jsx"
import AdminCustomers from "./pages/AdminCustomers.jsx"
import AdminSettings from "./pages/AdminSettings.jsx"
import UserDashboard from "./pages/UserDashboard.jsx"
import UserOrders from "./pages/UserOrders.jsx"
import UserProfile from "./pages/UserProfile.jsx"

// Fungsi untuk memeriksa localStorage
function checkUserStatus() {
  const fullName = localStorage.getItem("fullName")
  const isAdmin = localStorage.getItem("isAdmin")
  const userId = localStorage.getItem("userId")

  if (!fullName || !isAdmin || !userId) {
    localStorage.clear()
    return { isValid: false, isAdmin: false }
  }

  return { isValid: true, isAdmin: isAdmin === "1" }
}

const userStatus = checkUserStatus()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {userStatus.isValid ? (
          userStatus.isAdmin ? (
            <>
              <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/auth" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/user/*" element={<Navigate to="/admin/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/user/dashboard" />} />
              <Route path="/auth" element={<Navigate to="/user/dashboard" />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/orders" element={<UserOrders />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/admin/*" element={<Navigate to="/user/dashboard" />} />
            </>
          )
        ) : (
          <>
            <Route path="/" element={<App />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
