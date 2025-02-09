import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaSearch } from 'react-icons/fa';

function ProductCard({ product }) {
  const [showSimilar, setShowSimilar] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <img 
        src={product?.image || 'https://via.placeholder.com/300'} 
        alt={product?.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product?.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product?.description}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-primary">
            {product?.price?.toLocaleString('tr-TR')} TL
          </span>
          <div className="flex items-center space-x-2 text-gray-500">
            <span className="flex items-center">
              <FaEye className="mr-1" /> {product?.views || 0}
            </span>
            <span className="flex items-center">
              <FaHeart className="mr-1" /> {product?.likes || 0}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link 
            to={`/product/${product?.id}`}
            className="block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Detayları Gör
          </Link>
          
          {/* Benzer Ürünler Butonu */}
          <button
            onClick={() => setShowSimilar(!showSimilar)}
            className="w-full flex items-center justify-center gap-2 bg-accent text-white py-2 rounded-lg hover:bg-opacity-90 transition"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Benzer ürünleri göster"
          >
            <FaSearch className="text-sm" />
            Benzer Ürünler
          </button>
        </div>

        {/* Benzer Ürünler Popup */}
        {showSimilar && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 p-4 z-10 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Benzer Ürünler</h4>
              <button
                onClick={() => setShowSimilar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {/* Örnek benzer ürünler */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <img
                    src={`https://via.placeholder.com/50`}
                    alt="Similar product"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">Benzer {product?.title}</h5>
                    <p className="text-sm text-gray-500">{(product?.price * 0.9).toLocaleString('tr-TR')} TL</p>
                  </div>
                  <Link
                    to={`/product/${item}`}
                    className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-opacity-90"
                  >
                    İncele
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard; 