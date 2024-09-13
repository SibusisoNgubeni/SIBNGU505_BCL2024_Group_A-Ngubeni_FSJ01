"use client";
import Link from "next/link";
import "../products.css";
import { useState, useEffect } from "react";
import PaginationControls from "../../components/pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const skip = (page - 1) * productsPerPage;
      const res = await fetch(
        `https://next-ecommerce-api.vercel.app/products?limit=${productsPerPage}&skip=${skip}`
      );
      const newProducts = await res.json();
      setProducts(newProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {loading ? (
        <p className="loading"></p>
      ) : (
        <>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-card">
                <Link href={`/${product.id}`} className="link">
                  
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="product-image"
                    />
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-category">Category: {product.category}</p>
                    <p className="product-brand">Brand: {product.brand}</p>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-tags">Tags: {product.tags.join(", ")}</p>
                  
                </Link>
              </li>
            ))}
          </ul>

          <PaginationControls
            page={page}
            prevPage={prevPage}
            nextPage={nextPage}
            products={products}
            productsPerPage={productsPerPage}
          />
        </>
      )}
    </div>
  );
}
