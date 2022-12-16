import NavbarMin from './NavbarMin';
import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
import LoggedIn from './LoggedIn';

const Home = ({ userData, logout }: any) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [singleUser, setSingleUser] = useState([]);

  async function handleSubmit(event: any) {
    event.preventDefault();

    await userModel.postUser({
      firstName: name,
      lastName: lastname,
      phoneNumber: phone,
      emailAdress: email,
      password: password,
      oauth: String(userData.id),
    });

    // HÄR MÅSTE JAG FÅ TAG PÅ ID

    setIsActive(true);
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
  users.filter(async (user: any) => {
    if (user.Oauth === String(userData.id) && isActive === false) {
      console.log('inne', user.Oauth);
      const fetchUser = await userModel.getSingleUser(user.id);
      localStorage.setItem('id', user.id);
      setSingleUser(fetchUser);
      setIsActive(true);
    }
  });

  console.log(isActive);

  return (
    <div className='App'>
      {isActive === false ? (
        <>
          <NavbarMin userData={userData} logout={logout} />
          <div className='home-container'>
            <h2>Welcome {localStorage.getItem('user')}!</h2>
            <p>Continue to site by adding your information:</p>
            <form onSubmit={handleSubmit}>
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
              <div>
                <input
                  placeholder='Password'
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
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
                  placeholder='Phone number'
                  id='phone'
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button className='submit' type='submit' onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <LoggedIn
          userData={userData}
          logout={logout}
          singleUser={singleUser}
          gitHubId={userData.id}
        />
      )}
    </div>
  );
};

export default Home;
