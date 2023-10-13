import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createProduct, updateProduct } from '../api/productData';

const initialState = {
  description: '',
  price: '',
  name: '',
};

function ProductForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  // const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateProduct(formInput)
        .then(() => router.push('/products'));
    } else {
      const payload = { ...formInput };
      createProduct(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateProduct(patchPayload).then(() => {
          router.push('/products');
        });
      });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Product</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Product Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Product</Button>
    </Form>
  );
}

ProductForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.string,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;
