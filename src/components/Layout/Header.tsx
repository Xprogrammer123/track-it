import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Track", path: "/track" },
  
  ];

  const handleAdminClick = () => {
    if (state.isAdmin) {
      navigate("/admin");
    }
  };

  useEffect(() => {}, [state.user]);

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold">PackageTracker</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <motion.span whileHover={{ y: -2 }} className="inline-block">
                  {item.label}
                </motion.span>
              </Link>
            ))}
            {!state.isAuthenticated && (
              <button>
                <Link
                  to="/login"
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Login
                </Link>
              </button>
            )}
            {state.isAdmin && (
              <button
                onClick={handleAdminClick}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Admin Dashboard
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-gray-600 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!state.isAuthenticated && (
            {/*<div className="mt-8 flex justify-center items-center">
                  <Link
                    to="/login"
                    className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                </div>*/}
            
              )}
              {state.isAdmin && (
                <Button
                  onClick={handleAdminClick}
                  className="block text-gray-600 hover:text-red-600 transition-colors"
                >
                  Admin Dashboard
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
    </header>
  );
}

