import { useState } from 'react';
import userModel from '../models/userModels';
import Toast from './Toast';
import { ChoosePaymentProps } from '../interfaces/payment';

/**
 * A component for choosing a payment method
 */
const ChoosePayment = ({ user }: ChoosePaymentProps) => {
  /**
   * The state for whether to show the toast message
   */
  const [showToast, setShowToast] = useState(false);
  /**
   * The state for the message to display in the toast
   */
  const [toastMessage, setToastMessage] = useState('');

  /**
   * Changes the payment method to monthly and displays a toast message
   * @param event The click event
   */
  async function monthly(event: React.MouseEvent<HTMLButtonElement>) {
    await userModel.setPartialPayment(user.id, event.currentTarget.value);
    setToastMessage('Payment changed!');
    setShowToast(true);
  }

  /**
   * Changes the payment method to trip by trip and displays a toast message
   * @param event The click event
   */
  async function single(event: React.MouseEvent<HTMLButtonElement>) {
    await userModel.setPartialPayment(user.id, event.currentTarget.value);
    setToastMessage('Payment changed!');
    setShowToast(true);
  }

  /**
   * Gets the user's current payment method as a string
   * @returns 'Monthly' if the user's payment method is monthly, 'Trip by trip' otherwise
   */
  function getMethod() {
    if (user.PartialPayment === 1) {
      return 'Monthly';
    } else {
      return 'Trip by trip';
    }
  }
  return (
    <>
      <div className='payment-container'>
        {showToast && <Toast message={toastMessage} />}
        <p>
          Current payment: <strong>{getMethod()}</strong>
        </p>
        <button className='payment-btn' value='0' onClick={single}>
          Pay trip by trip
        </button>
        <button className='payment-btn' value='1' onClick={monthly}>
          Pay trips monthly
        </button>
      </div>
    </>
  );
};

export default ChoosePayment;
