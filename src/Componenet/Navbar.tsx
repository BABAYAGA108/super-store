import { useState, useRef, useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";

const Navbar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <i className="fas fa-baby text-3xl text-pink-500 mr-2"></i>
            <span className="text-2xl font-bold text-blue-800">My Store</span>
          </div>

          {/* Search bar - Centered */}
          <div className="order-last sm:order-none w-full sm:w-auto mt-4 sm:mt-0">
            <form
              className="group relative max-w-md mx-auto"
              role="search"
              aria-label="Site Search"
            >
              <label htmlFor="navbar-search" className="sr-only">
                Search
              </label>
              <input
                id="navbar-search"
                type="text"
                placeholder="Search..."
                className="w-full sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 dark:border-gray-600 px-4 py-1 focus:outline-none focus:border-orange-400 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 font-semibold hover:text-orange-500 transition-colors duration-300"
                aria-label="Search"
              >
                <SlMagnifier />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex justify-center gap-6 items-end">
              <li className="transition-all duration-300 ease-in-out hover:-translate-y-1">
                <a
                  href="/"
                  className="flex flex-col items-center text-blue-700 hover:text-pink-500"
                >
                  <i className="fas fa-home text-xl"></i>
                  <span className="text-sm mt-1">Home</span>
                </a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:-translate-y-1">
                <a
                  href="/products"
                  className="flex flex-col items-center text-blue-700 hover:text-pink-500"
                >
                  <i className="fas fa-tshirt text-xl"></i>
                  <span className="text-sm mt-1">Products</span>
                </a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:-translate-y-1">
                <a
                  href="/about"
                  className="flex flex-col items-center text-blue-700 hover:text-pink-500"
                >
                  <i className="fas fa-info-circle text-xl"></i>
                  <span className="text-sm mt-1">About</span>
                </a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:-translate-y-1">
                <a
                  href="/contact"
                  className="flex flex-col items-center text-blue-700 hover:text-pink-500"
                >
                  <i className="fas fa-envelope text-xl"></i>
                  <span className="text-sm mt-1">Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Expanding Search Bar */}
            <div className="relative flex items-center" ref={searchRef}>
              <input
                type="text"
                className={`bg-blue-50 rounded-full h-10 transition-all duration-500 ease-in-out border-none outline-none ${
                  isSearchExpanded ? "w-64 px-4 opacity-100" : "w-10 opacity-0"
                }`}
                placeholder="Search products..."
                onFocus={() => setIsSearchExpanded(true)}
              />
              <button
                className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-blue-700 hover:text-pink-500"
                onClick={() => {
                  setIsSearchExpanded(!isSearchExpanded);
                  if (!isSearchExpanded) {
                    setTimeout(() => {
                      const input = searchRef.current?.querySelector("input");
                      if (input) input.focus();
                    }, 100);
                  }
                }}
                aria-label="Search"
              >
                <i className="fas fa-search text-xl"></i>
              </button>
            </div>

            <a
              href="#"
              className="text-blue-700 hover:text-pink-500"
              aria-label="Shopping Cart"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
            </a>
            <a
              href="#"
              className="text-blue-700 hover:text-pink-500"
              aria-label="User Account"
            >
              <i className="fas fa-user text-xl"></i>
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-blue-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden bg-blue-50 py-4 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-4 mb-4">
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search products..."
              />
              <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <ul className="flex flex-col space-y-3 px-4">
            <li>
              <a
                href="/"
                className="flex items-center text-blue-700 hover:text-pink-500 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-home w-8 text-center"></i>
                <span className="ml-2">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="flex items-center text-blue-700 hover:text-pink-500 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-tshirt w-8 text-center"></i>
                <span className="ml-2">Products</span>
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="flex items-center text-blue-700 hover:text-pink-500 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-info-circle w-8 text-center"></i>
                <span className="ml-2">About</span>
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="flex items-center text-blue-700 hover:text-pink-500 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-envelope w-8 text-center"></i>
                <span className="ml-2">Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
