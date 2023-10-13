import { useState, useEffect } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getProducts } from '../api/productData';
import { createProductOrders } from '../api/PO';

const SelectProduct = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAddProduct = (productId) => {
    if (window.confirm('Add product to order?')) {
      createProductOrders(orderId, productId).then(() => {
        router.push(`/Orders/${orderId}`);
      });
    }
  };

  return (
    <Card className="max-width-card">
      <Card.Body>
        <h1>Select Products to Add</h1>
        <ListGroup>
          {products.map((Product) => (
            <Card key={Product.id}>
              <ListGroup>
                <h4>{Product.name}</h4>
                <p>Price: {Product.price}</p>
                <Button
                  variant="success"
                  onClick={() => handleAddProduct(Product.id)}
                >
                  Add to Order
                </Button>
              </ListGroup>
            </Card>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default SelectProduct;
