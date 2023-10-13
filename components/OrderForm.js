import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createOrder, updateOrder } from '../api/OrderData';

const initialState = {
  name: '',
};

function OrderForm({ orderObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (orderObj.id) {
      setFormInput(orderObj);
    }
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      updateOrder(formInput)
        .then(() => router.push(`/Orders/${orderObj.id}`));
    } else {
      const payload = { ...formInput, Id: orderObj.id };
      createOrder(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateOrder(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{orderObj.id ? 'Update' : 'Create'} Order</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Order Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{orderObj.id ? 'Update' : 'Create'} Order</Button>
    </Form>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};

export default OrderForm;
