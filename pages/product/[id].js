import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../api/productData';

export default function ViewProduct() {
  const [productDetails, setProductDetails] = useState({});

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setProductDetails);
  }, [id]);

  return (
    <>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
      }}
      >
        <div className="text-center">
          {/* <Link href="/newOrder" passHref>
            <Button variant="dark">Add To Order?</Button>
          </Link> */}
          <div className="text-white mt-5 details">
            <h2 className="card-title bold">{productDetails.name}</h2>
            <p className="card-text bold">{productDetails.price}</p>
            <p className="card-text bold">{productDetails.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
