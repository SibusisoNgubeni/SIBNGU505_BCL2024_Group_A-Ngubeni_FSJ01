"use client"; 

import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('https://next-ecommerce-api.vercel.app/products/${id}'); // Hardcoded ID 2
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} className="product-image" />
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>Tags: {product.tags.join(', ')}</p>
    </div>
  );
}
