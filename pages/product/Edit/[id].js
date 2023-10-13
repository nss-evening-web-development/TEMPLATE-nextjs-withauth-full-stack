import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../../api/productData';
import ProductForm from '../../../components/ProductForm';

export default function EditProduct() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setEditItem);
  }, [id]);

  return (<ProductForm obj={editItem} />);
}
