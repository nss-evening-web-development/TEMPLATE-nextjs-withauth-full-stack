const dbUrl = 'https://localhost:7120';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}`, {
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

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrder = (orderObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderObj),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then(resolve)
    .catch(reject);
});

export {
  getOrders,
  createOrder,
  deleteOrder,
  getSingleOrder,
  updateOrder,
};
