import { notFound } from 'next/navigation';

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
      <div>
        <h1>{product.title}</h1>
        <img src={product.images[0]} alt={product.title} style={{ width: '300px' }} />
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
        <p>Tags: {product.tags.join(', ')}</p>
      </div>
    );
  } catch (error) {
    notFound(); 
  }
}
