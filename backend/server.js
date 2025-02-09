const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ürünleri getir
app.get('/api/products', (req, res) => {
  console.log('Ürünler getiriliyor...');
  const query = `
    SELECT p.*, c.name as category_name 
    FROM products p
    LEFT JOIN categories c ON p.category = c.slug
    WHERE p.status = 'active'
    ORDER BY p.created_at DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Ürünler getirilirken hata:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    console.log('Bulunan ürün sayısı:', rows?.length || 0);
    res.json(rows);
  });
});

// Ürün detayı getir
app.get('/api/products/:id', (req, res) => {
  const query = `
    SELECT p.*, c.name as category_name 
    FROM products p
    LEFT JOIN categories c ON p.category = c.slug
    WHERE p.id = ? AND p.status = 'active'
  `;
  
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Ürün bulunamadı' });
      return;
    }
    // Görüntülenme sayısını artır
    db.run('UPDATE products SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json(row);
  });
});

// Yeni ürün ekle
app.post('/api/products', (req, res) => {
  const {
    title,
    description,
    price,
    category,
    condition,
    brand,
    model,
    warranty,
    warranty_period,
    image_url
  } = req.body;

  const query = `
    INSERT INTO products (
      title, description, price, category, condition, 
      brand, model, warranty, warranty_period, image_url,
      seller_id, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    title,
    description,
    price,
    category,
    condition,
    brand,
    model,
    warranty ? 1 : 0,
    warranty_period,
    image_url,
    1, // Örnek seller_id
    'active'
  ];

  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      message: 'Ürün başarıyla eklendi'
    });
  });
});

// Ürün beğen/beğenmekten vazgeç
app.post('/api/products/:id/like', (req, res) => {
  const { id } = req.params;
  const { liked } = req.body;

  const query = `
    UPDATE products 
    SET likes = likes ${liked ? '+' : '-'} 1 
    WHERE id = ?
  `;

  db.run(query, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Ürün ${liked ? 'beğenildi' : 'beğenmekten vazgeçildi'}` });
  });
});

// Benzer ürünleri getir
app.get('/api/products/:id/similar', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT p2.* 
    FROM products p1
    JOIN products p2 ON p1.category = p2.category
    WHERE p1.id = ? 
    AND p2.id != ? 
    AND p2.status = 'active'
    LIMIT 3
  `;

  db.all(query, [id, id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Kategorileri getir
app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Kategori bazlı ürünleri getir
app.get('/api/categories/:slug/products', (req, res) => {
  const query = `
    SELECT p.*, c.name as category_name 
    FROM products p
    LEFT JOIN categories c ON p.category = c.slug
    WHERE p.category = ? AND p.status = 'active'
    ORDER BY p.created_at DESC
  `;

  db.all(query, [req.params.slug], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Ürün ara
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  const searchTerm = `%${q}%`;

  const query = `
    SELECT p.*, c.name as category_name 
    FROM products p
    LEFT JOIN categories c ON p.category = c.slug
    WHERE (p.title LIKE ? OR p.description LIKE ? OR p.brand LIKE ? OR p.model LIKE ?)
    AND p.status = 'active'
    ORDER BY p.created_at DESC
  `;

  db.all(query, [searchTerm, searchTerm, searchTerm, searchTerm], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Server'ı başlat
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
}); 