import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../config/firestore'

const Edit = ({ orders, selectedOrder, setOrders, setIsEditing, getOrders }) => {
  const id = selectedOrder.id;

  const [clientName, setClientName] = useState(selectedOrder.clientName);
  const [orderText, setOrderText] = useState(selectedOrder.orderText);
  const [deliveryType, setDeliveryType] = useState(selectedOrder.deliveryType);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!clientName || !orderText || !deliveryType) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const order = {
      id,
      clientName,
      orderText,
      deliveryType,
    };

    await setDoc(doc(db, "orders", id), {
      ...order
    });

    setOrders(orders);
    setIsEditing(false);
    getOrders()

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${order.firstName} ${order.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
      <h1>Επεξεργασία παραγγελίας</h1>
        <label htmlFor="clientName">Όνομα</label>
        <input
          id="clientName"
          type="text"
          name="clientName"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          placeholder="Το όνομά σας"
        />
        <label htmlFor="orderText">Παραγγελία</label>
        <input
          id="orderText"
          type="text"
          name="orderText"
          value={orderText}
          onChange={e => setOrderText(e.target.value)}
          placeholder="πχ ελληνικό διπλό μέτριο"
        />
        <div style={{margin: "1rem 0 0.5rem"}}>
          <select
            id='deliveryType'
            name='deliveryType'
            value={deliveryType}
            onChange={e => setDeliveryType(e.target.value)}
          >
            <option value="pickup">Θα παραλάβω εγώ</option>
            <option value="delivery">Παράδοση στο γραφείο</option>
          </select>
        </div>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Αποστολή" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Ακύρωση"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
