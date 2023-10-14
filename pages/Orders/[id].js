import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getOrderProducts, deleteProductOrders } from '../../api/PO';
import { getSingleOrder } from '../../api/OrderData';

export default function ViewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderInformation, setOrderInformation] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const calculateTotalPrice = (data) => {
    let total = 0;
    data.forEach((order) => {
      total += order.price;
    });
    setTotalPrice(total);
  };
  const getProducts = () => {
    getOrderProducts(id).then((data) => {
      if (data) {
        setOrderDetails(data);
        calculateTotalPrice(data);
      }
    });
  };

  const handleDeleteItem = (itemId) => {
    deleteProductOrders(itemId, id)
      .then(() => {
        getProducts();
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  console.warn(id, 'orderId');

  useEffect(() => {
    getProducts();
  }, [id]);

  useEffect(() => {
    getSingleOrder().then(setOrderInformation);
  }, []);

  return (
    <>
      <h1>Orders Items</h1>
      <Button
        variant="dark"
        className="mr-2"
        onClick={() => router.push(`/addToOrder?orderId=${id}`)}
      >
        Add Item
      </Button>
      <div className="text-white my-5 details">
        <h2 className="card-title bold">Order Name: {orderInformation.name}</h2>
        <div className="mt-5 d-flex flex-wrap">
          {orderDetails.map((order) => (
            <div key={order?.id} className="text-white ms-5 details">
              <h1>Item Name: {order.name}</h1>
              <p>Price: {order.price}</p>
              <Button
                variant="danger"
                onClick={() => handleDeleteItem(order.id)}
              >
                Delete
              </Button>
              <hr />
            </div>
          ))}
        </div>
        <h3>Total Price: {totalPrice}</h3>
      </div>
    </>
  );
}
