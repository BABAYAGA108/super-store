// src/Component/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Product from "./Product";

// Home Page Component
function HomePage() {
  return (
    <div>
      <Hero />
      <Product />
    </div>
  );
}

// Placeholder components for other pages
function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          About Us
        </h1>
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-lg">
          <p className="text-gray-600 mb-4">
            Welcome to Little Treasures, your premier destination for children's
            hospital gifts and comfort items. We understand that hospital visits
            can be challenging for children and families, which is why we've
            carefully curated a selection of products designed to bring comfort,
            joy, and distraction during difficult times.
          </p>
          <p className="text-gray-600 mb-4">
            All our products are hospital-approved, safe, and specifically
            chosen to be age-appropriate. From soft comfort items to educational
            toys, each product is selected with love and care by our team of
            child development specialists.
          </p>
          <p className="text-gray-600">
            Our mission is simple: to provide items that help children feel more
            comfortable during their hospital stay and to support families
            through challenging times.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Contact Us
        </h1>
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-700">Email</h3>
                  <p className="text-gray-600">info@littletreasures.com</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700">Hospital Hours</h3>
                  <p className="text-gray-600">Mon-Fri: 8am-8pm</p>
                  <p className="text-gray-600">Sat-Sun: 9am-6pm</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Visit Our Store
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-700">Location</h3>
                  <p className="text-gray-600">
                    Children's Hospital Gift Shop
                    <br />
                    123 Healing Way
                    <br />
                    Comfort City, CC 12345
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700">Delivery Service</h3>
                  <p className="text-gray-600">
                    Free delivery to patient rooms
                    <br />
                    Available during hospital hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Your Cart
        </h1>
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
          <p className="text-center text-gray-600 mb-8">
            Your cart is currently empty. Visit our{" "}
            <a
              href="/products"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              products page
            </a>{" "}
            to start shopping!
          </p>
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          My Account
        </h1>
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-800">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
