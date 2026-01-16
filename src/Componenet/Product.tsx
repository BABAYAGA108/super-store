// components/ProductStore.tsx
import React, { useState } from "react";

interface IconProps {
  className?: string;
  fill?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const IconWrapper: React.FC<IconProps> = ({ children, className, ...props }) => (
  <span className={className} aria-hidden {...props}>
    {children}
  </span>
);

const ShoppingCart: React.FC<IconProps> = (props) => <IconWrapper {...props}>🛒</IconWrapper>;
const Heart: React.FC<IconProps> = (props) => <IconWrapper {...props}>❤️</IconWrapper>;
const Search: React.FC<IconProps> = (props) => <IconWrapper {...props}>🔍</IconWrapper>;
const Filter: React.FC<IconProps> = (props) => <IconWrapper {...props}>⚙️</IconWrapper>;
const Info: React.FC<IconProps> = (props) => <IconWrapper {...props}>ℹ️</IconWrapper>;
const Plus: React.FC<IconProps> = (props) => <IconWrapper {...props}>➕</IconWrapper>;
const Minus: React.FC<IconProps> = (props) => <IconWrapper {...props}>➖</IconWrapper>;
const Trash2: React.FC<IconProps> = (props) => <IconWrapper {...props}>🗑️</IconWrapper>;
const Shield: React.FC<IconProps> = (props) => <IconWrapper {...props}>🛡️</IconWrapper>;
const ToyBrick: React.FC<IconProps> = (props) => <IconWrapper {...props}>🧱</IconWrapper>;
const BookOpen: React.FC<IconProps> = (props) => <IconWrapper {...props}>📖</IconWrapper>;
const Stethoscope: React.FC<IconProps> = (props) => <IconWrapper {...props}>🩺</IconWrapper>;
const Gamepad2: React.FC<IconProps> = (props) => <IconWrapper {...props}>🎮</IconWrapper>;
const Palette: React.FC<IconProps> = (props) => <IconWrapper {...props}>🎨</IconWrapper>;
const Bed: React.FC<IconProps> = (props) => <IconWrapper {...props}>🛏️</IconWrapper>;
const Baby: React.FC<IconProps> = (props) => <IconWrapper {...props}>👶</IconWrapper>;

// Product Type Definition - FIXED: Added missing {
interface Product {
  id: number;
  name: string;
  category: "toys" | "books" | "medical" | "games" | "art" | "comfort";
  ageRange: string;
  description: string;
  price: number;
  imageColor: string;
  inStock: boolean;
  popularity: number;
  tags: string[];
  hospitalApproved: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

// Renamed component to avoid naming conflict with Product interface
const ProductStore: React.FC = () => {
  // Initial Products Data
  const initialProducts: Product[] = [
    {
      id: 1,
      name: "Soft Teddy Bear",
      category: "comfort",
      ageRange: "0-3",
      description: "Hypoallergenic plush teddy for comfort",
      price: 24.99,
      imageColor: "bg-pink-100",
      inStock: true,
      popularity: 5,
      tags: ["soft", "hypoallergenic", "comfort"],
      hospitalApproved: true,
    },
    {
      id: 2,
      name: "Medical Play Kit",
      category: "medical",
      ageRange: "3-8",
      description: "Doctor play set for medical procedure preparation",
      price: 34.99,
      imageColor: "bg-blue-100",
      inStock: true,
      popularity: 4,
      tags: ["educational", "doctor", "play"],
      hospitalApproved: true,
    },
    {
      id: 3,
      name: "Hospital Adventure Book",
      category: "books",
      ageRange: "4-10",
      description: "Storybook explaining hospital procedures",
      price: 14.99,
      imageColor: "bg-green-100",
      inStock: true,
      popularity: 4,
      tags: ["educational", "story", "coping"],
      hospitalApproved: true,
    },
    {
      id: 4,
      name: "Building Blocks Set",
      category: "toys",
      ageRange: "2-6",
      description: "Easy-grip colorful building blocks",
      price: 29.99,
      imageColor: "bg-yellow-100",
      inStock: true,
      popularity: 5,
      tags: ["creative", "motor skills", "safe"],
      hospitalApproved: true,
    },
    {
      id: 5,
      name: "Quiet Activity Pad",
      category: "games",
      ageRange: "3-12",
      description: "Quiet games for bedridden patients",
      price: 19.99,
      imageColor: "bg-purple-100",
      inStock: true,
      popularity: 3,
      tags: ["quiet", "entertainment", "bed-friendly"],
      hospitalApproved: true,
    },
    {
      id: 6,
      name: "Hospital Gown Buddy",
      category: "comfort",
      ageRange: "1-5",
      description: "Matching doll with hospital gown",
      price: 22.99,
      imageColor: "bg-red-100",
      inStock: false,
      popularity: 4,
      tags: ["comfort", "familiarity", "doll"],
      hospitalApproved: true,
    },
  ];

  // State Management
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showGuide, setShowGuide] = useState(true);

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesAge = ageFilter === "all" || product.ageRange === ageFilter;

    return matchesSearch && matchesCategory && matchesAge;
  });

  // Cart Functions
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Category Icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "toys":
        return <ToyBrick className="w-5 h-5" />;
      case "books":
        return <BookOpen className="w-5 h-5" />;
      case "medical":
        return <Stethoscope className="w-5 h-5" />;
      case "games":
        return <Gamepad2 className="w-5 h-5" />;
      case "art":
        return <Palette className="w-5 h-5" />;
      case "comfort":
        return <Bed className="w-5 h-5" />;
      default:
        return <Baby className="w-5 h-5" />;
    }
  };

  // Age Range Colors
  const getAgeColor = (ageRange: string) => {
    switch (ageRange) {
      case "0-3":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "3-8":
        return "bg-green-50 border-green-200 text-green-700";
      case "4-10":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "2-6":
        return "bg-purple-50 border-purple-200 text-purple-700";
      case "3-12":
        return "bg-pink-50 border-pink-200 text-pink-700";
      case "1-5":
        return "bg-indigo-50 border-indigo-200 text-indigo-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
              🏥 Children's Hospital Gift Shop
            </h1>
            <p className="text-blue-600">
              Carefully selected items for comfort, healing, and play
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              <Info className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">
                {showGuide ? "Hide Guide" : "Show Guide"}
              </span>
            </button>

            <div className="relative">
              <button className="relative p-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <span className="text-xs text-blue-600 mt-1 block">Cart</span>
            </div>
          </div>
        </div>

        {/* User Guide */}
        {showGuide && (
          <div className="bg-white rounded-xl p-6 mb-6 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-blue-900">
                How to Use This Store
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-2">
                    1
                  </div>
                  <h3 className="font-bold text-blue-800">Browse Products</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  Use filters to find age-appropriate items. Look for{" "}
                  <span className="font-semibold">hospital-approved</span> badge
                  for safety.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-2">
                    2
                  </div>
                  <h3 className="font-bold text-green-800">Add to Cart</h3>
                </div>
                <p className="text-green-700 text-sm">
                  Click <span className="font-semibold">"Add to Cart"</span>{" "}
                  button. You can adjust quantities in your cart.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-2">
                    3
                  </div>
                  <h3 className="font-bold text-purple-800">Checkout</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  Review your cart and proceed to checkout. Items can be
                  delivered to patient rooms.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">
                Product Labels Explained:
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                  <Shield className="w-3 h-3 mr-1" /> Hospital Approved
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Age Range: 3-8
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Popular
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  Out of Stock
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm sticky top-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Products
            </h3>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Category
              </label>
              <div className="space-y-2">
                {[
                  "all",
                  "toys",
                  "books",
                  "medical",
                  "games",
                  "art",
                  "comfort",
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "hover:bg-blue-50 text-blue-600"
                    }`}
                  >
                    <span className="capitalize">
                      {category === "all" ? "All Categories" : category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Age Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Age Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["all", "0-3", "1-5", "2-6", "3-8", "4-10", "3-12"].map(
                  (age) => (
                    <button
                      key={age}
                      onClick={() => setAgeFilter(age)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        ageFilter === age
                          ? "bg-blue-500 text-white"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                    >
                      {age === "all" ? "All Ages" : age}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t border-blue-200">
              <h4 className="text-sm font-medium text-blue-700 mb-2">
                Store Info
              </h4>
              <div className="space-y-2 text-sm text-blue-600">
                <div className="flex justify-between">
                  <span>Total Products:</span>
                  <span className="font-medium">{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>In Your Cart:</span>
                  <span className="font-medium">{cart.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span>Hospital Approved:</span>
                  <span className="font-medium text-green-600">
                    {products.filter((p) => p.hospitalApproved).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Products */}
        <div className="lg:w-2/4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-900">
              Products ({filteredProducts.length})
            </h2>
            <div className="text-sm text-blue-600">
              Showing {filteredProducts.length} of {products.length} items
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-blue-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                No products found
              </h3>
              <p className="text-blue-600">
                Try adjusting your filters or search term
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl border-2 ${
                    product.hospitalApproved
                      ? "border-green-200 hover:border-green-300"
                      : "border-blue-200 hover:border-blue-300"
                  } p-4 transition-all hover:shadow-lg`}
                >
                  {/* Product Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(product.category)}
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {product.hospitalApproved && (
                        <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Approved
                        </span>
                      )}

                      <button
                        onClick={() =>
                          setFavorites((prev) =>
                            prev.includes(product.id)
                              ? prev.filter((id) => id !== product.id)
                              : [...prev, product.id]
                          )
                        }
                        className={`p-1 rounded-full ${
                          favorites.includes(product.id)
                            ? "text-red-500 bg-red-50"
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        <Heart
                          className="w-5 h-5"
                          fill={
                            favorites.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                  </div>

                  {/* Product Image Placeholder */}
                  <div
                    className={`${product.imageColor} h-32 rounded-lg mb-4 flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">
                        {product.category === "toys" && "🧸"}
                        {product.category === "books" && "📚"}
                        {product.category === "medical" && "🏥"}
                        {product.category === "games" && "🎮"}
                        {product.category === "art" && "🎨"}
                        {product.category === "comfort" && "🛌"}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {product.name.split(" ")[0]}
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <h3 className="font-bold text-lg text-blue-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>

                  {/* Tags and Age */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${getAgeColor(
                        product.ageRange
                      )}`}
                    >
                      Age: {product.ageRange}
                    </span>
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {product.popularity >= 4 && (
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Price and Action */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-900">
                        ${product.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-xs ${
                          product.inStock ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>

                    <button
                      onClick={() => product.inStock && addToCart(product)}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                        product.inStock
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar - Cart */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm sticky top-6">
            <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Your Cart ({cart.length})
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="font-bold text-blue-900 mb-2">
                  Your cart is empty
                </h4>
                <p className="text-blue-600 text-sm">
                  Add some items from the store to get started
                </p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="border border-blue-100 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-blue-900">
                            {item.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`px-2 py-1 rounded text-xs ${getAgeColor(
                                item.ageRange
                              )}`}
                            >
                              Age: {item.ageRange}
                            </span>
                            {item.hospitalApproved && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                Approved
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-blue-200 rounded-lg hover:bg-blue-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-blue-200 rounded-lg hover:bg-blue-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-blue-600">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t border-blue-200 pt-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-blue-700">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-blue-700">
                      <span>Hospital Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-blue-700 font-bold text-lg pt-2 border-t border-blue-200">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors mb-3">
                    Proceed to Checkout
                  </button>

                  <div className="text-center text-sm text-blue-600">
                    <p className="mb-1">
                      Items can be delivered to patient rooms
                    </p>
                    <p>All purchases support hospital programs</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 rounded-xl p-6 mt-4 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Shopping Tips
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Look for "Hospital Approved" badge for safety
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Check age recommendations for appropriateness
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Popular items are marked with a yellow badge
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                All items are sanitized before delivery
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-blue-200 text-center text-blue-600 text-sm">
        <p>
          🏥 Children's Hospital Gift Shop • All items selected for patient
          safety and comfort
        </p>
        <p className="mt-1">
          Need help? Ask your nurse or visit the reception desk
        </p>
      </footer>
    </div>
  );
};

export default ProductStore;