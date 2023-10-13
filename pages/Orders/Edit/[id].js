import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderForm from '../../../components/OrderForm';
import { getSingleOrder } from '../../../api/OrderData';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditItem);
  }, [id]);

  return (<OrderForm obj={editItem} />);
}
