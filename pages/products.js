import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/productData';

export default function Home() {
  const [products, setProducts] = useState([]);

  const getAllTheProducts = () => {
    getProducts().then(setProducts);
  };

  useEffect(() => {
    getAllTheProducts();
  }, []);

  console.log('products', products);

  return (
    <div className="text-center my-4">
      <Link href="/product/newProduct" passHref>
        <Button variant="dark">Add A Product</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} productObj={product} onUpdate={getAllTheProducts} />
        ))}
      </div>

    </div>
  );
}
