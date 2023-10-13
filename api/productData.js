const dbUrl = 'https://localhost:7120';

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products`, {
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

const deleteProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createProduct = (productObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productObj),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products/${id}`, {
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
  getProducts,
  createProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
};
