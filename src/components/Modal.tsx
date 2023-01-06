import React, { useState } from 'react';
import userModels from '../models/userModels';

// type ModalProps = {
//   isOpen: boolean;
//   showModal: () => void;
//   hideModal: () => void;
// };

function Modal({ setUserData, setToken, setUser, isOpen, showModal, hideModal }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await userModels.login(username, password);
      setUser(user.data.info.user);
      setToken(user.data.token);
      setUserData(user.data.info.user);
      localStorage.setItem('value', 'login-username');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <div className='form-container'>
              <form className='login-form' onSubmit={handleSubmit}>
                <label className='login-label' htmlFor='username'>
                  Email
                </label>
                <input
                  className='login-input'
                  type='text'
                  id='username'
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />

                <label className='login-label' htmlFor='password'>
                  Password
                </label>
                <input
                  className='login-input'
                  type='password'
                  id='password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className='btn-container-login'>
                  <button className='login-btn' type='submit'>
                    Log in
                  </button>
                </div>
              </form>
            </div>
            <div className='modal-close'>
              <button onClick={hideModal}>&times;</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
