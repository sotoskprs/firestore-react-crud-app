import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'

const Dashboard = ({ setIsAuthenticated }) => {
  const [orders, setOrders] = useState();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orders = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setOrders(orders)
  }

  useEffect(() => {
    getOrders()
  }, []);

  const handleEdit = id => {
    const [order] = orders.filter(order => order.id === id);

    setSelectedOrder(order);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [order] = orders.filter(order => order.id === id);

        deleteDoc(doc(db, "orders", id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${order.firstName} ${order.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const ordersCopy = orders.filter(order => order.id !== id);
        setOrders(ordersCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            orders={orders}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          orders={orders}
          setOrders={setOrders}
          setIsAdding={setIsAdding}
          getOrders={getOrders}
        />
      )}
      {isEditing && (
        <Edit
          orders={orders}
          selectedOrder={selectedOrder}
          setOrders={setOrders}
          setIsEditing={setIsEditing}
          getOrders={getOrders}
        />
      )}
    </div>
  );
};

export default Dashboard;
