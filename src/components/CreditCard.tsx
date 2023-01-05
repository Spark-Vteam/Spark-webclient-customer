import React, { useState } from 'react';
import { CreditCard } from '../interfaces/payment';
import paymentModel from '../models/paymentModels';
import Toast from './Toast';

const CreditCardForm = ({ user }: any) => {
  const [card, setCard] = useState<CreditCard>({
    pan: '',
    expiry: '',
    firstName: '',
    lastName: '',
    truncpan: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const creditCardInfo = {
      pan: card.pan,
      expiry: card.expiry,
      firstName: card.firstName,
      lastName: card.lastName,
      truncpan: card.pan.slice(-4),
    };

    try {
      await paymentModel.insertCreditCard(user.id, creditCardInfo);
      setToastMessage(`Card ****${card.pan.slice(-4)} added`);
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMessage('Could insert card, try again');
      setShowToast(true);
    }
  }

  return (
    <>
      {showToast && <Toast message={toastMessage} />}
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Card number'
          type='text'
          name='pan'
          value={card.pan}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder='MM/YY'
          type='text'
          name='expiry'
          value={card.expiry}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder='First Name'
          type='text'
          name='firstName'
          value={card.firstName}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder='Last Name'
          type='text'
          name='lastName'
          value={card.lastName}
          onChange={handleChange}
        />
        <br />
        {/* <label htmlFor='truncpan'>Truncated card number</label>
      <input
        type='text'
        name='truncpan'
        value={card.truncpan}
        onChange={handleChange}
      />
      <br /> */}
        <button className='submit-card' type='submit'>
          Add card
        </button>
      </form>
    </>
  );
};

export default CreditCardForm;
