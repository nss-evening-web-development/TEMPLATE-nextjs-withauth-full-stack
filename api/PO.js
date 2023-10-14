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

const deleteProductOrders = (ProductId, OrderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/ProductOrders/${ProductId}/${OrderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete order. Status: ${response.status}`);
      }
      resolve(response);
    })
    .catch(reject);
});
export {
  createProductOrders,
  getOrderProducts,
  deleteProductOrders,
};
