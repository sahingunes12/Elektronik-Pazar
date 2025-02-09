import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white font-bold text-xl">
            ElektronikPazar
          </Link>
          <div className="flex space-x-4">
            <Link to="/products" className="text-white hover:text-accent">
              Ürünler
            </Link>
            <Link to="/profile" className="text-white hover:text-accent">
              Profilim
            </Link>
            <Link to="/login" className="text-white hover:text-accent">
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 