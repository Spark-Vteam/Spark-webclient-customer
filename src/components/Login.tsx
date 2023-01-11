import React, { useState, useEffect } from 'react';
import './css/Toast.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Modal from './Modal';

/**
 * Login component for the application.
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.setUserData - A function that sets the user data in the parent component.
 * @returns {JSX.Element} - The JSX element to render.
 */
function Login({ setUserData }: any): JSX.Element {
  const [rerender, setRerender] = useState(false);
  const [, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setUser] = useState([]);
  const [, setToken] = useState('');

  /**
   * Opens the modal.
   * @returns {void}
   */
  function showModal(): void {
    setIsModalOpen(true);
  }

  /**
   * Closes the modal.
   * @returns {void}
   */
  function hideModal(): void {
    setIsModalOpen(false);
  }

  /**
   * useEffect hook to check if the user has an access token stored in local storage and, if so,
   * set the user data in the parent component.
   */
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setUserData({
        login: localStorage.getItem('token') || '',
        email: localStorage.getItem('email') || '',
        name: localStorage.getItem('name') || '',
        avatar_url: localStorage.getItem('avatar') || '',
        id: localStorage.getItem('id') || '',
      });
    }
  }, [setUserData]);

  /**
   * Makes a GET request to the server to retrieve the access token using the code passed as a parameter.
   * @param {string|null} codeParam - The code to use to retrieve the access token.
   * @returns {Promise<void>} - A promise that resolves when the access token
   */
  async function getAccessToken(codeParam: string | null) {
    await fetch('http://localhost:4000/v1/auth/getAccessToken?code=' + codeParam, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem('accessToken', data.access_token);
          setRerender(!rerender);

          setUserData(data);
          localStorage.setItem('user', data.login);
          localStorage.setItem('avatar', data.avatar_url);
          localStorage.setItem('email', data.email);
          localStorage.setItem('name', data.name);
          localStorage.setItem('id', data.id);
        }
      });
    getUserData();
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    if (codeParam && localStorage.getItem('accessToken') === null) {
      getAccessToken(codeParam);
    } else {
      setUserData({
        login: localStorage.getItem('user') || '',
        email: localStorage.getItem('email') || '',
        name: localStorage.getItem('name') || '',
        avatar_url: localStorage.getItem('avatar') || '',
        id: localStorage.getItem('id') || '',
      });
    }
    // eslint-disable-next-lineclear
  }, [setUserData]); // eslint-disable-line react-hooks/exhaustive-deps

  async function getUserData() {
    await fetch('http://localhost:4000/v1/auth/getUserData', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        localStorage.setItem('user', data.login);
        localStorage.setItem('avatar', data.avatar_url);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('id', data.id);
      });
  }

  function login(event: any) {
    window.location.assign(
      `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}`,
    );
    const loginValue = event.target.value;
    localStorage.setItem('value', loginValue);
    setValue(event.target.value);
  }

  return (
    <div>
      <button className='btn-login btn' value='register' onClick={login}>
        Register with GitHub <FontAwesomeIcon icon={faGithub} />
      </button>
      <p>Already a member?</p>
      <button className='login-btn' value='login-github' onClick={login}>
        Github login
      </button>
      <span> or </span>
      <Modal
        setUserData={setUserData}
        setToken={setToken}
        setUser={setUser}
        isOpen={isModalOpen}
        showModal={showModal}
        hideModal={hideModal}
      />
      <button className='login-btn' value='login-username' onClick={showModal}>
        Username login
      </button>
    </div>
  );
}

export default Login;
