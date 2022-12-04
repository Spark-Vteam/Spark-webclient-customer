// importing Link from react-router-dom to navigate to
import Navbar from './Navbar';
import NavbarMin from './NavbarMin';
import { useState, useEffect } from 'react';
import userModel from '../models/userModels';

const Home = ({ logout, userData }: any) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);

  async function handleSubmit(event: any) {
    event.preventDefault();

    const insertUser = {
      firstName: name,
      lastName: lastname,
      phoneNumber: phone,
      emailAdress: email,
      // username??
    };

    await userModel.postUser(insertUser);
  }

  /**
   * fetch users from API
   * @returns {Promise<void>}
   */
  async function fetchUsers(): Promise<void> {
    const users = await userModel.getUsers();
    setUsers(users);
  }

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** @type {Array} filter bikes depending on status */
  const filteredUser: Array<any> = users.filter((user: any) => user.PhoneNumber === phone);

  // Hitta ett sätt att kontrollera om användaren finns i databasen. Kolla genom github användarnamn, telefonnummer?

  // Endpoint user/:id

  console.log(filteredUser);

  return (
    <div className='App'>
      {/* Kolla upp om användare finns i databasen. Rendera olika sidor beroende på om användaren ska registerra sig eller inte */}
      {filteredUser.length === 0 ? (
        <>
          <NavbarMin userData={userData} logout={logout} />
          <div className='home-container'>
            <h2>Welcome {localStorage.getItem('user')}!</h2>
            <p>Continue to side by adding your information:</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder='First name'
                  id='firstname'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder='Last name'
                  id='lastname'
                  type='text'
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder='Email'
                  id='email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* <div>
                <input
                  placeholder='Password'
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div> */}
              <div>
                <input
                  placeholder='Phone number'
                  id='phone'
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button className='submit' type='submit'>
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <div>
          <Navbar userData={userData} logout={logout} />
          <>
            <p>User exists is in database</p>
          </>
        </div>
      )}
    </div>
  );
};

export default Home;
