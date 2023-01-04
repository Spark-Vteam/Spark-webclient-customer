import { useState, useEffect, Fragment } from 'react';
import paymentModel from '../models/paymentModels';
import { Invoice } from '../interfaces/payment';
import Toast from './Toast';
import CreditCard from './CreditCard';
import paymentModule from '../modules/paymentModule';

import Navbar from './Navbar';
// importing Link from react-router-dom to navigate to

const Payment = ({ userData, logout, singleUser }: any) => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);
  const [balance, setBalance] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  const creditCard = '123456';

  const user = singleUser[0];

  useEffect(() => {
    setRerender(!rerender);
  }, [balance]);

  useEffect(() => {
    console.log('rerender:', rerender);
    console.log('accessToken:', localStorage.getItem('accessToken'));
  }, [rerender]);

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
  }, [balance]); // eslint-disable-line react-hooks/exhaustive-deps

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

  async function doPayment(event: any) {
    event.preventDefault();

    const invoiceId = event.target.value;

    try {
      await paymentModel.payOneInvoice(invoiceId, user.id);
      setToastMessage('Invoice payed!');
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMessage('Could not pay invoice, try again.');
      setShowToast(true);
    }
  }

  function checkStatusMessage(status: number): string {
    const message = paymentModule.checkStatus(status);
    return message;
  }

  console.log(user.Balance);

  return (
    <div className='App'>
      <Navbar userData={userData} logout={logout} />
      {showToast && <Toast message={toastMessage} />}
      <div className='container'>
        <h1>Payment method</h1>
        <div className='flex-container'>
          <div className='child'>
            <h3>Current balance: {user.Balance} SEK</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  placeholder='Update balance'
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
                <h3>Add a credit card</h3>
                <CreditCard user={user} />
              </div>
            ) : (
              <p>Credit Card added</p>
            )}
          </div>
        </div>
        <div className='invoices-container'>
          <h1>Invoices</h1>
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
                <th></th>
              </tr>
            </thead>
            <tbody data-testid='invoice-row' data-testid="invoice-row" className='pricing-table-body'>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.Amount}</td>
                  <td data-testid='invoice-row' data-testid="invoice-row">{formatDate(invoice.Created)}</td>
                  <td>{formatDate(invoice.Expires)}</td>
                  <td>{formatDate(invoice.Paid)}</td>
                  <td>{invoice.Rents_id}</td>
                  <td>{checkStatusMessage(invoice.Status)}</td>
                  {invoice.Status === 40 ||
                  user.Balance + 1 <= invoice.Amount ||
                  invoice.Status === 20 ? (
                    <td>
                      <button value={invoice.id} className='disabled' onClick={doPayment} disabled>
                        Pay with balance
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button value={invoice.id} onClick={doPayment}>
                        Pay with balance
                      </button>
                    </td>
                  )}
                  {(creditCard === '123456' && invoice.Status === 40) || invoice.Status === 20 ? (
                    <td></td>
                  ) : (
                    <td>
                      <button value={invoice.id} onClick={doPayment}>
                        Pay with credit card ****3456
                      </button>
                    </td>
                  )}
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
