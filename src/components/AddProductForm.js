import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function AddProductForm({ onSubmit }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'used',
    brand: '',
    model: '',
    warranty: false,
    warranty_period: '',
    image_url: ''
  });

  const categories = [
    { id: 1, name: 'Telefon', slug: 'phone' },
    { id: 2, name: 'Laptop', slug: 'laptop' },
    { id: 3, name: 'Tablet', slug: 'tablet' },
    { id: 4, name: 'Kulaklık', slug: 'audio' },
    { id: 5, name: 'Giyilebilir Teknoloji', slug: 'wearable' },
    { id: 6, name: 'Oyun Konsolları', slug: 'gaming' },
    { id: 7, name: 'Kamera', slug: 'camera' },
    { id: 8, name: 'Bilgisayar Parçaları', slug: 'components' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      condition: 'used',
      brand: '',
      model: '',
      warranty: false,
      warranty_period: '',
      image_url: ''
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-accent text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition"
      >
        <FaPlus /> Yeni Ürün Ekle
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Yeni Ürün Ekle</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Başlık</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Kategori</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Seçiniz</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Marka</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fiyat (TL)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Durum</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="new">Yeni</option>
                    <option value="like_new">Az Kullanılmış</option>
                    <option value="used">Kullanılmış</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Açıklama</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="warranty"
                    checked={formData.warranty}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-sm">Garantili</label>
                </div>

                {formData.warranty && (
                  <div className="flex-1">
                    <input
                      type="text"
                      name="warranty_period"
                      value={formData.warranty_period}
                      onChange={handleChange}
                      placeholder="Garanti Süresi"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Resim URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                >
                  Ürün Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProductForm; 