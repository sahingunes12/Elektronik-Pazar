const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'elektronik_pazar.db'), (err) => {
  if (err) {
    console.error('Database bağlantı hatası:', err);
  } else {
    console.log('Database bağlantısı başarılı');
  }
});

// Ürünler tablosu
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    condition TEXT NOT NULL, -- Ürün durumu (yeni, az kullanılmış, kullanılmış)
    brand TEXT NOT NULL,    -- Marka
    model TEXT,            -- Model
    warranty BOOLEAN,      -- Garanti durumu
    warranty_period TEXT,  -- Garanti süresi
    image_url TEXT,
    seller_id INTEGER,     -- Satıcı ID
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active', -- active, sold, inactive
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Kategoriler tablosu
db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
  )
`);

// Örnek kategorileri ekle
const categories = [
  ['Telefon', 'phone'],
  ['Laptop', 'laptop'],
  ['Tablet', 'tablet'],
  ['Kulaklık', 'audio'],
  ['Giyilebilir Teknoloji', 'wearable'],
  ['Oyun Konsolları', 'gaming'],
  ['Kamera', 'camera'],
  ['Bilgisayar Parçaları', 'components']
];

categories.forEach(category => {
  db.run('INSERT OR IGNORE INTO categories (name, slug) VALUES (?, ?)', category);
});

module.exports = db; 