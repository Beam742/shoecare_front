import React, { useState, useEffect } from "react"
import { HiStar as StarIcon, HiCheckCircle as Check, HiMenu as Menu, HiX as Close } from "react-icons/hi"
import { GiConverseShoe } from "react-icons/gi"
import axios from "axios"

import HeroImg from "./assets/hero_img.jpg"
import AboutImg from "./assets/about_img.jpg"
import { Link } from "react-router-dom"

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/jasa`)
        setServices(response.data)
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }

    fetchServices()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link className="flex items-center" to={"/"}>
            <GiConverseShoe alt="ShoeCare Logo" className="mr-2 text-2xl text-blue-600" />
            <span className="text-xl font-bold text-blue-600">ShoeCare</span>
          </Link>
          <button className="md:hidden ml-4" onClick={toggleMenu}>
            <Menu className="h-6 w-6 text-gray-800" />
          </button>
          <div className="hidden md:flex space-x-5 items-center text-base md:text-lg">
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Beranda
            </a>
            <a href="#service" className="text-gray-800 hover:text-blue-600">
              Layanan
            </a>
            <a href="#about" className="text-gray-800 hover:text-blue-600">
              Tentang
            </a>
            <a href="#footer" className="text-gray-800 hover:text-blue-600">
              Kontak
            </a>
            <Link
              to={"/auth"}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Masuk
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 w-64 px-4`}
      >
        <button className="absolute top-4 left-4" onClick={toggleMenu}>
          <Close className="h-6 w-6 text-gray-800" />
        </button>
        <div className="flex flex-col items-center mt-16 space-y-4">
          <a
            href="#"
            className="text-gray-800 hover:text-blue-600 w-full text-center py-2 rounded-lg"
            onClick={toggleMenu}
          >
            Beranda
          </a>
          <a
            href="#service"
            className="text-gray-800 hover:text-blue-600 w-full text-center py-2 rounded-lg"
            onClick={toggleMenu}
          >
            Layanan
          </a>
          <a
            href="#about"
            className="text-gray-800 hover:text-blue-600 w-full text-center py-2 rounded-lg"
            onClick={toggleMenu}
          >
            Tentang
          </a>
          <a
            href="#footer"
            className="text-gray-800 hover:text-blue-600 w-full text-center py-2 rounded-lg"
            onClick={toggleMenu}
          >
            Kontak
          </a>
          <Link
            to={"/auth"}
            className="bg-blue-600 text-white w-full text-center py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={toggleMenu}
          >
            Masuk
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white pt-6" id="#">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Sepatu Anda Layak Mendapatkan Perawatan Terbaik</h1>
              <p className="text-xl mb-6">Layanan pembersihan dan restorasi sepatu profesional</p>
              <Link
                to={"/auth"}
                className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
              >
                Pesan Sekarang
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src={HeroImg}
                alt="Proses pembersihan sepatu"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Tentang Kami</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src={AboutImg} alt="Tim kami" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <p className="text-xl leading-relaxed mb-4">
                Di ShoeCare, kami bersemangat untuk menjaga sepatu Anda dalam kondisi prima. Dengan pengalaman
                bertahun-tahun dan tim ahli yang berdedikasi, kami menawarkan layanan pembersihan dan restorasi sepatu
                terbaik.
              </p>
              <p className="text-xl leading-relaxed">
                Teknik canggih dan produk ramah lingkungan kami memastikan sepatu Anda tidak hanya terlihat bagus tetapi
                juga bertahan lebih lama. Percayakan kepada kami untuk memberikan perawatan terbaik bagi sepatu
                kesayangan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Section */}
      <section className="py-16 bg-gray-100" id="step">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Proses Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Buat Pesanan",
                description: "Mulai dengan membuat pesanan melalui website kami dan pilih layanan yang diinginkan.",
              },
              {
                title: "Verifikasi Pembayaran",
                description: "Admin kami akan memverifikasi pembayaran Anda untuk memastikan transaksi berhasil.",
              },
              {
                title: "Penjemputan",
                description:
                  "Setelah pembayaran diverifikasi, sepatu Anda akan dijadwalkan untuk dijemput oleh tim kami.",
              },
              {
                title: "Proses Pengerjaan",
                description: "Sepatu Anda akan dibawa ke toko kami untuk diproses sesuai layanan yang dipilih.",
              },
              {
                title: "Selesai",
                description:
                  "Setelah pengerjaan selesai, Anda dapat mengambil sepatu di toko atau meminta pengantaran.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Advantages Section */}
      <section className="py-16 bg-white" id="adventage">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Pekerja ahli",
              "Produk ramah lingkungan",
              "Waktu pengerjaan cepat",
              "Harga terjangkau",
              "Kepuasan terjamin",
              "Penjemputan dan pengantaran gratis",
            ].map((advantage, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md p-6 flex items-center justify-center text-center h-40"
              >
                <Check className="text-green-500 text-2xl mr-2" />
                <span className="text-lg">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-gray-100" id="service">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{service.nama_jasa}</h3>
                <p className="text-gray-600 mb-4">Mulai dari</p>
                <p className="text-2xl font-bold text-blue-600">Rp{service.harga}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white" id="testi">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Apa Kata Pelanggan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Budi Santoso", text: "Layanan yang sangat memuaskan! Sepatu saya terlihat seperti baru." },
              { name: "Dewi Lestari", text: "Cepat, efisien, dan sangat profesional. Sangat direkomendasikan!" },
              {
                name: "Andi Prasetyo",
                text: "Shoecare melakukan lebih dari yang diharapkan untuk merestorasi sepatu kesayangan saya.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-8" id="footer">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">ShoeCare</h3>
              <p>Menjaga sepatu Anda tetap segar dan bersih</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Beranda
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Layanan
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Tentang Kami
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
              <p className="mb-2">123 Jalan Sepatu, Cleanville</p>
              <p className="mb-2">Telepon: (555) 123-4567</p>
              <p>Email: info@shoecare.com</p>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  Facebook
                </a>
                <a href="#" className="hover:text-gray-300">
                  Instagram
                </a>
                <a href="#" className="hover:text-gray-300">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-500 mt-8 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} ShoeCare. Hak cipta dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
