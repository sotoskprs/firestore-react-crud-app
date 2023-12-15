import React from 'react';

const Table = ({ orders, handleEdit, handleDelete }) => {

  // const formatter = new Intl.NumberFormat('en-UK', {
  //   style: 'currency',
  //   currency: 'EUR',
  //   minimumFractionDigits: null,
  // });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Όνομα</th>
            <th>Παραγγελία</th>
            <th>Παράδοση</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders ? (
            orders.map((order, i) => (
              <tr key={order.id}>
                {/* <td>{order.id}</td> */}
                <td>{order.clientName}</td>
                <td>{order.orderText}</td>
                <td>{order.deliveryType === "delivery" ? "Ναι" : ""}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
