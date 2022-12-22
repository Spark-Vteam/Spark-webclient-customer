import { useState, useEffect, Fragment } from 'react';
import paymentModel from '../models/paymentModels';
import { Invoice } from '../interfaces/payment';
import Toast from './Toast';
import CreditCard from './CreditCard';

import Navbar from './Navbar';
// importing Link from react-router-dom to navigate to

const Payment = ({ userData, logout, singleUser }: any) => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);
  const [balance, setBalance] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const user = singleUser[0];

  /**
   * fetch users from API
   * @returns {Promise<void>}
   */
  async function fetchInvoices(): Promise<void> {
    const invoices = await paymentModel.getInvoicesByUser(user.id);
    setInvoices(invoices);
  }

  useEffect(() => {
    (async () => {
      await fetchInvoices();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function formatDate(dateString: string): string {
    if (dateString === null) {
      return 'Information is missing';
    } else {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    try {
      await paymentModel.updateBalance(user.id, balance);
      setToastMessage('Balance updated!');
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMessage('Could not update balance, try again.');
      setShowToast(true);
    }
  }

  console.log(user);
  return (
    <div className='App'>
      <Navbar userData={userData} logout={logout} />
      {showToast && <Toast message={toastMessage} />}
      <div className='container'>
        <h2>Payment method & Invoices</h2>
        <div className='flex-container'>
          <div className='child'>
            <h3>Current balance: {user.Balance}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Update balance:
                <input
                  type='number'
                  value={balance}
                  onChange={(event) => setBalance(event.target.value)}
                />
              </label>
              <button className='submit-balance' type='submit'>
                Update balance
              </button>
            </form>
          </div>
          <div className='child'>
            {user.PartialPayment === 0 || user.PartialPayment === null ? (
              <div>
                <h3>Add a credit card to pay monthly</h3>
                <CreditCard />
              </div>
            ) : (
              <p>Credit Card added</p>
            )}
          </div>
        </div>
        <div className='invoices-container'>
          <h3>Invoices</h3>
          <table className='pricing-table'>
            <thead className='pricing-table-head'>
              <tr className='pricing-table-row'>
                <th>Amount (SEK)</th>
                <th>Created</th>
                <th>Expires</th>
                <th>Paid</th>
                <th>Rent id</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='pricing-table-body'>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.Amount}</td>
                  <td>{formatDate(invoice.Created)}</td>
                  <td>{formatDate(invoice.Expires)}</td>
                  <td>{formatDate(invoice.Paid)}</td>
                  <td>{invoice.Rents_id}</td>
                  <td>{invoice.Status}</td>
                  <td>
                    <button value={invoice.id}>Pay with balance</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment;
