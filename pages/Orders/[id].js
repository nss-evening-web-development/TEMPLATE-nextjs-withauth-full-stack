import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getOrderProducts } from '../../api/PO';
import ProductCard from '../../components/ProductCard';

export default function ViewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [, setOrderProducts] = useState([]);
  const [Products] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getProducts = () => {
    getOrderProducts(id).then((data) => {
      if (data) {
        setOrderDetails(data);
        setOrderProducts(Products);
      }
    });
  };

  useEffect(() => {
    getProducts();
  });

  const productArray = orderDetails.map((order) => order.products?.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
  }))).flat();

  return (
    <>
      <h1>Orders Items</h1>
      <Button variant="dark" className="mr-2" onClick={() => router.push(`/addToOrder?orderId=${id}`)}>
        Add Item
      </Button>
      <div className="mt-5 d-flex flex-wrap">
        {orderDetails.map((order) => (
          <div key={order?.id} className="text-white ms-5 details">
            <h1>Order Name: {order.name}</h1>
            <p>Status: {order.orderStatusId === 1 ? 'Open' : 'Closed'}</p>
            <p>Tip: {order.tip}</p>
            <hr />
            <h2>Items On Order</h2>
            {productArray?.map((product) => (
              <ProductCard key={product?.id} productObj={product} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
