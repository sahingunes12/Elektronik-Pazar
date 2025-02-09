import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaShoppingCart, FaHandshake } from 'react-icons/fa';
import AddProductForm from '../components/AddProductForm';
import api from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Ürünler yüklenirken bir hata oluştu');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await api.addProduct(productData);
      loadProducts(); // Ürünleri yeniden yükle
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Ürün eklenirken bir hata oluştu');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              İkinci El Elektronik Eşyalar
            </h1>
            <p className="text-xl mb-8">
              Güvenilir alışverişin adresi
            </p>
            <div className="max-w-xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ne aramıştınız?"
                  className="flex-1 p-3 rounded-lg text-gray-800 focus:outline-none"
                />
                <button className="bg-accent px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaShoppingCart className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Kolay Alışveriş</h3>
            <p className="text-gray-600">Güvenli ve hızlı bir şekilde alışveriş yapın</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaHandshake className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Güvenli Ödeme</h3>
            <p className="text-gray-600">Güvenli ödeme seçenekleriyle işlemlerinizi tamamlayın</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaSearch className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Geniş Ürün Yelpazesi</h3>
            <p className="text-gray-600">Binlerce ürün arasından seçiminizi yapın</p>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Öne Çıkan Ürünler</h2>
          <AddProductForm onSubmit={handleAddProduct} />
        </div>
        {loading && <div className="text-center">Yükleniyor...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siz de Ürününüzü Satın</h2>
          <p className="text-xl mb-8">
            Kullanmadığınız elektronik eşyalarınızı hemen satışa çıkarın
          </p>
          <button className="bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition">
            Hemen İlan Ver
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home; 