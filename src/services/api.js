import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  // Ürünleri getir
  getProducts: () => axios.get(`${API_URL}/products`),
  
  // Ürün detayı getir
  getProduct: (id) => axios.get(`${API_URL}/products/${id}`),
  
  // Yeni ürün ekle
  addProduct: (productData) => axios.post(`${API_URL}/products`, productData),
  
  // Ürün beğen/beğenmekten vazgeç
  likeProduct: (id, liked) => axios.post(`${API_URL}/products/${id}/like`, { liked }),
  
  // Benzer ürünleri getir
  getSimilarProducts: (id) => axios.get(`${API_URL}/products/${id}/similar`),
  
  // Kategorileri getir
  getCategories: () => axios.get(`${API_URL}/categories`),
  
  // Kategori bazlı ürünleri getir
  getCategoryProducts: (slug) => axios.get(`${API_URL}/categories/${slug}/products`),
  
  // Ürün ara
  searchProducts: (query) => axios.get(`${API_URL}/search`, { params: { q: query } })
};

export default api; 