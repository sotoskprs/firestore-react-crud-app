import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { collection, addDoc } from "firebase/firestore"
import { db } from '../../config/firestore'


const Add = ({ orders, setOrders, setIsAdding, getOrders }) => {
  const [clientName, setClientName] = useState('')
  const [orderText, setOrderText] = useState('')
  const [deliveryType, setDeliveryType] = useState('pickup')

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!clientName || !orderText || !deliveryType) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      })
    }

    const newOrder = {
      clientName,
      orderText,
      deliveryType
    }

    orders.push(newOrder);

    try {
      await addDoc(collection(db, "orders"), {
        ...newOrder
      })
    } catch (error) {
      console.log(error)
    }

    setOrders(orders)
    setIsAdding(false)
    getOrders()

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${clientName} ${orderText}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Δημιουργία παραγγελίας</h1>
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
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  )
}

export default Add
