"use client";
import { notFound } from 'next/navigation';
import '../detailedProduct.css';
import Navbar from '@/components/navbar';

async function fetchProduct(id) {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
  if (!res.ok) {
    throw new Error('Product not found');
  }
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  
  try {
    const product = await fetchProduct(id);
    
    
    
    return (
      <div className="product-detail">
        <Navbar />
        <div className="displayBox1">
          <h1>{product.title}</h1>
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - thumbnail ${index + 1}`}
                className="thumbnail-image"
              
              />
            ))}
          </div>
        </div>
        <div className="displayBox2">
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>Price: ${product.price}</p>
          <p>In Stock: {product.stock}</p>
          <p>Tags: {product.tags.join(', ')}</p>
          <p>Rating: {product.rating}</p>
        </div>

        {/* Display Reviews */}
        <div className='reviews'>
          <h3>Reviews:</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews">
              {product.reviews.map((review, index) => (
               <div key={index} className="review">
               <p><strong>{review.author}</strong></p>
               <p>{review.comment || 'No comment provided'}</p>
               <p>Rating: {review.rating || 'N/A'}/5</p>
             </div>
              ))}
            </div>
          ) : (
            <p>No reviews available for this product.</p>
          )}
          </div>
      </div>
    );
  } catch (error) {
    notFound(); 
  }
}
