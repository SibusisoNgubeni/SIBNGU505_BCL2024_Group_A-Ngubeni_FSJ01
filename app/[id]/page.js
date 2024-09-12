import { notFound } from 'next/navigation';
import '../detailedProduct.css'

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
        <h1>{product.title}</h1>

        <div className="product-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} - image ${index + 1}`}
              className="product-image"
            />
          ))}
        </div>

        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p>Price: ${product.price}</p>
        <p>In Stock: {product.stock}</p>
        <p>{product.description}</p>
        <p>Tags: {product.tags.join(', ')}</p>
        <p>Rating: {product.rating}</p>
      </div>
    );
  } catch (error) {
    notFound(); 
  }
}
