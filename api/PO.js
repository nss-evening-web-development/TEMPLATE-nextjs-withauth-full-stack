const dbUrl = 'https://localhost:7120';

const createProductOrders = (OrderId, ProductId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/ProductOrders/${ProductId}/${OrderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getOrderProducts = (orderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/ordersProducts/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createProductOrders,
  getOrderProducts,
};
