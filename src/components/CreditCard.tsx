import React, { useState } from 'react';
import { CreditCard } from '../interfaces/payment';
import paymentModel from '../models/paymentModels';
import Toast from './Toast';

const CreditCardForm = ({ user }: any) => {
  const [card, setCard] = useState<CreditCard>({
    cardNumber: '',
    expiry: '',
    firstName: '',
    lastName: '',
    truncatedCardNumber: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const insertCard = {
      cardNumber: card.cardNumber,
      expiry: card.expiry,
      firstName: card.firstName,
      lastName: card.lastName,
      truncatedCardNumber: card.cardNumber.slice(-4),
    };

    try {
      await paymentModel.insertCreditCard(user.id, insertCard);
      setToastMessage(`Card ****${card.cardNumber.slice(-4)} added`);
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
          name='cardNumber'
          value={card.cardNumber}
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
        {/* <label htmlFor='truncatedCardNumber'>Truncated card number</label>
      <input
        type='text'
        name='truncatedCardNumber'
        value={card.truncatedCardNumber}
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
