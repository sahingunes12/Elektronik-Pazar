const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Veritabanı bağlantısını oluştur
const db = new sqlite3.Database(path.join(__dirname, 'elektronik_pazar.db'), (err) => {
  if (err) {
    console.error('Database bağlantı hatası:', err);
    return;
  }
  console.log('Database bağlantısı başarılı');
  
  // Tabloları sırayla oluştur
  createTables();
});

function createTables() {
  // Önce kategoriler tablosunu oluştur
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE
    )
  `, (err) => {
    if (err) {
      console.error('Kategoriler tablosu oluşturma hatası:', err);
      return;
    }
    console.log('Kategoriler tablosu oluşturuldu');
    
    // Sonra örnek kategorileri ekle
    insertCategories();
  });
}

function insertCategories() {
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

  const stmt = db.prepare('INSERT OR IGNORE INTO categories (name, slug) VALUES (?, ?)');
  
  categories.forEach(category => {
    stmt.run(category, (err) => {
      if (err) console.error('Kategori ekleme hatası:', err);
    });
  });
  
  stmt.finalize(() => {
    console.log('Kategoriler eklendi');
    // Ürünler tablosunu oluştur
    createProductsTable();
  });
}

function createProductsTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      category TEXT NOT NULL,
      condition TEXT NOT NULL,
      brand TEXT NOT NULL,
      model TEXT,
      warranty BOOLEAN,
      warranty_period TEXT,
      image_url TEXT,
      seller_id INTEGER,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category) REFERENCES categories(slug)
    )
  `, (err) => {
    if (err) {
      console.error('Ürünler tablosu oluşturma hatası:', err);
      return;
    }
    console.log('Ürünler tablosu oluşturuldu');
    
    // Örnek ürünleri ekle
    insertSampleProducts();
  });
}

function insertSampleProducts() {
  const sampleProducts = [
    {
      title: "iPhone 14 Pro Max",
      description: "1 yıl kullanılmış, batarya sağlığı %89, kutusu ve tüm aksesuarları mevcut",
      price: 42000,
      category: "phone",
      condition: "used",
      brand: "Apple",
      model: "iPhone 14 Pro Max",
      warranty: true,
      warranty_period: "6 ay",
      image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
      seller_id: 1
    },
    {
      title: "MacBook Pro M2",
      description: "2023 model, 16GB RAM, 512GB SSD, çiziksiz",
      price: 45000,
      category: "laptop",
      condition: "like_new",
      brand: "Apple",
      model: "MacBook Pro M2",
      warranty: true,
      warranty_period: "1 yıl",
      image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      seller_id: 1
    },
    {
      title: "Samsung Galaxy S23 Ultra",
      description: "6 ay kullanılmış, garantili, S Pen dahil",
      price: 35000,
      category: "phone",
      condition: "used",
      brand: "Samsung",
      model: "Galaxy S23 Ultra",
      warranty: true,
      warranty_period: "1.5 yıl",
      image_url: "https://images.unsplash.com/photo-1678911820864-e5c67e784c10",
      seller_id: 1
    }
  ];

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO products (
      title, description, price, category, condition, brand, model,
      warranty, warranty_period, image_url, seller_id, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
  `);

  sampleProducts.forEach(product => {
    stmt.run([
      product.title,
      product.description,
      product.price,
      product.category,
      product.condition,
      product.brand,
      product.model,
      product.warranty ? 1 : 0,
      product.warranty_period,
      product.image_url,
      product.seller_id
    ], (err) => {
      if (err) console.error('Örnek ürün ekleme hatası:', err);
    });
  });

  stmt.finalize(() => {
    console.log('Örnek ürünler eklendi');
    
    // Veritabanı bağlantısını kapat
    db.close((err) => {
      if (err) {
        console.error('Database kapatma hatası:', err);
        return;
      }
      console.log('Database kurulumu tamamlandı ve bağlantı kapatıldı');
    });
  });
} 