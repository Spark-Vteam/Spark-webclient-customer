import { useState } from 'react';
import userModel from '../models/userModels';
import Toast from './Toast';

const ChoosePayment = ({ user }: any) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  async function monthly(event: any) {
    await userModel.setPartialPayment(user.id, event.target.value);
    setToastMessage('Payment changed!');
    setShowToast(true);
  }
  async function single(event: any) {
    await userModel.setPartialPayment(user.id, event.target.value);
    setToastMessage('Payment changed!');
    setShowToast(true);
  }

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
