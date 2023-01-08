import { useState, useEffect } from 'react';
import paymentModel from '../models/paymentModels';
import { Invoice } from '../interfaces/payment';
import Toast from './Toast';
import Invoices from './Invoices';
import CreditCard from './CreditCard';
import ChoosePayment from './ChoosePayment';
import Navbar from './Navbar';

const Payment = ({ userData, logout, singleUser }: any) => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);
  const [balance, setBalance] = useState('');
  const [truncPan, setTruncPan] = useState('');
  const [creditCard, setCreditCard] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [rerender, setRerender] = useState(false);

  const user = singleUser;

  useEffect(() => {
    setRerender(!rerender);
  }, [balance, rerender]);

  /**
   * fetch users from API
   * @returns {Promise<void>}
   */
  async function fetchCreditCards(): Promise<void> {
    const cards = await paymentModel.getCreditCards(user.id);
    if (cards.length !== 0) {
      setCreditCard(cards[0]);
      setTruncPan(cards[0].TruncPan);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchCreditCards();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div className='App'>
      <Navbar userData={userData} logout={logout} />
      {showToast && <Toast message={toastMessage} />}
      <div className='container'>
        <h1>Payment method</h1>
        <ChoosePayment user={user} />
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
            <div>
              <h3>Add a credit card</h3>
              <CreditCard user={user} />
            </div>
          </div>
        </div>
        <Invoices invoices={invoices} user={user} creditCard={creditCard} truncPan={truncPan} />
      </div>
    </div>
  );
};

export default Payment;
