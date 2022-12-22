import React, { useState } from 'react';

interface CreditCard {
  cardNumber: string;
  expiry: string;
  firstName: string;
  lastName: string;
  truncatedCardNumber: string;
}

const CreditCardForm: React.FC = () => {
  const [card, setCard] = useState<CreditCard>({
    cardNumber: '',
    expiry: '',
    firstName: '',
    lastName: '',
    truncatedCardNumber: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Kod för att lägga till kreditkortet i databasen här
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='cardNumber'>Card number</label>
      <input type='text' name='cardNumber' value={card.cardNumber} onChange={handleChange} />
      <br />
      <label htmlFor='expiry'>Expiry</label>
      <input type='text' name='expiry' value={card.expiry} onChange={handleChange} />
      <br />
      <label htmlFor='firstName'>First Name</label>
      <input type='text' name='firstName' value={card.firstName} onChange={handleChange} />
      <br />
      <label htmlFor='lastName'>Last Name</label>
      <input type='text' name='lastName' value={card.lastName} onChange={handleChange} />
      <br />
      <label htmlFor='truncatedCardNumber'>Truncated card number</label>
      <input
        type='text'
        name='truncatedCardNumber'
        value={card.truncatedCardNumber}
        onChange={handleChange}
      />
      <br />
      <button className='submit-card' type='submit'>
        Add card
      </button>
    </form>
  );
};

export default CreditCardForm;
