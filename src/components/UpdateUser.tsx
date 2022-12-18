import Navbar from './Navbar';
import userModel from '../models/userModels';
import { useState } from 'react';

const UpdateUser = ({ userData, logout, singleUser }: any) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const user = singleUser[0];

  async function handleSubmit(event: any) {
    event.preventDefault();

    await userModel.updateUser(user.id, {
      firstName: name,
      lastName: lastname,
      phoneNumber: phone,
      emailAdress: email,
      password: password,
      oauth: userData.id,
    });

    alert('User updated');

    // setIsActive(true);
  }
  return (
    <div className='App'>
      <Navbar userData={userData} logout={logout} />
      <div className='container'>
        <div className='App2'>
          <h2>Enter your information</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder='Email address'
                id='email'
                type='text'
                //   defaultValue={user.EmailAdress}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder='Password'
                id='password'
                type='password'
                //   defaultValue={user.Password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                placeholder='First name'
                id='firstname'
                type='text'
                //   defaultValue={user.FirstName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder='Last name'
                id='lastname'
                type='text'
                //   defaultValue={user.LastName}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder='Phone number'
                id='phone'
                type='text'
                //   defaultValue={user.PhoneNumber}
                value={phone}
                onChange={(e) => setPhone(e.target.defaultValue)}
              />
            </div>
            <button className='submit' type='submit' onClick={handleSubmit}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
