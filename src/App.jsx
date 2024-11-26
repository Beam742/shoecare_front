import React, { useState } from "react"
import { HiStar as StarIcon, HiCheckCircle as Check, HiMenu as Menu, HiX as Close } from "react-icons/hi"
import { GiConverseShoe } from "react-icons/gi"

import HeroImg from "./assets/hero_img.jpg"
import AboutImg from "./assets/about_img.jpg"
import { Link } from "react-router-dom"

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              Home
            </a>
            <a href="#service" className="text-gray-800 hover:text-blue-600">
              Services
            </a>
            <a href="#about" className="text-gray-800 hover:text-blue-600">
              About
            </a>
            <a href="#footer" className="text-gray-800 hover:text-blue-600">
              Contact
            </a>
            <Link
              to={"/auth"}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Login
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
            Home
          </a>
          <a
            href="#service"
            className="text-gray-800 hover:text-blue-600 w-full text-center py-2 rounded-lg"
            onClick={toggleMenu}
          >
            Services
          </a>
          <a
            href="#about"
            className="text-gray-800 hover:text-blue-600 w-full text-center py-2 rounded-lg"
            onClick={toggleMenu}
          >
            About
          </a>
          <a
            href="#footer"
            className="text-gray-800 hover:text-blue-600 w-full text-center py-2 rounded-lg"
            onClick={toggleMenu}
          >
            Contact
          </a>
          <Link
            to={"/auth"}
            className="bg-blue-600 text-white w-full text-center py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={toggleMenu}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white pt-6" id="#">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Shoes Deserve the Best Care</h1>
              <p className="text-xl mb-6">Professional shoe cleaning and restoration services</p>
              <Link
                to={"/auth"}
                className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
              >
                Book Now
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src={HeroImg}
                alt="Shoe cleaning process"
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
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src={AboutImg} alt="Our team" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <p className="text-xl leading-relaxed mb-4">
                At ShoeCare, we're passionate about keeping your footwear in pristine condition. With years of
                experience and a dedicated team of experts, we offer top-notch shoe cleaning and restoration services.
              </p>
              <p className="text-xl leading-relaxed">
                Our state-of-the-art techniques and eco-friendly products ensure that your shoes not only look great but
                also last longer. Trust us to give your beloved shoes the care they deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Section */}
      <section className="py-16 bg-gray-100" id="step">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Drop Off", description: "Bring your shoes to our store or schedule a pickup" },
              { title: "Inspection", description: "We assess your shoes and determine the best cleaning method" },
              { title: "Cleaning", description: "Our experts clean and restore your shoes with care" },
              { title: "Pick Up", description: "Collect your refreshed shoes or have them delivered" },
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Expert technicians",
              "Eco-friendly products",
              "Quick turnaround",
              "Affordable prices",
              "Satisfaction guaranteed",
              "Free pickup and delivery",
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Deep Cleaning", price: "$30" },
              { title: "Leather Conditioning", price: "$25" },
              { title: "Sole Restoration", price: "$40" },
              { title: "Color Touch-up", price: "$35" },
              { title: "Waterproofing", price: "$20" },
              { title: "Deodorizing", price: "$15" },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">Starting from</p>
                <p className="text-2xl font-bold text-blue-600">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white" id="testi">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John D.", text: "Incredible service! My shoes look brand new." },
              { name: "Sarah M.", text: "Fast, efficient, and very professional. Highly recommended!" },
              { name: "Mike R.", text: "The team went above and beyond to restore my favorite pair." },
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
              <p>Keeping your shoes fresh and clean since 2010</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Services
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="mb-2">123 Shoe Street, Cleanville</p>
              <p className="mb-2">Phone: (555) 123-4567</p>
              <p>Email: info@shoecare.com</p>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
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
            <p>&copy; 2023 ShoeCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
