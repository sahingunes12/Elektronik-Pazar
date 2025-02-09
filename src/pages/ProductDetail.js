import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  return (
    <div>
      <h1>Ürün Detay - {id}</h1>
    </div>
  );
}

export default ProductDetail; 