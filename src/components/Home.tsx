import NavbarMin from './NavbarMin';
import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
import { useNavigate, Navigate } from 'react-router-dom';

const Home = ({ userData, logout, singleUser, setSingleUser }: any) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    await fetchUsers();
    // HUR SKA JAG KUNNA HÄMTA ANVÄDNAREN FRÅN DATABASEN FÖR ATT FORTFARANDE VARA INLOGGAD?
    // DENNA DEL MÅSTE ÄNDRAS SÅ JAG INTE SKICKAR ONÖDIGT MPNGA REQUESTS

    /** @type {Array} filter bikes depending on status */
    // OBS DUBBBELANVÄND KOD, ÄNDRA!!!!
    users.filter(async (user: any) => {
      console.log(userData.id, user.Oauth);
      if (user.Oauth === String(userData.id)) {
        console.log(user.Oauth);
        const fetchUser = await userModel.getSingleUser(user.id);
        setSingleUser(fetchUser);
        console.log('i funktionen', singleUser);
        navigate('Overview');
      }
    });
    console.log(singleUser);

    if (singleUser.length !== 0) {
      navigate('Overview');
    }
    // navigate('Overview');
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
    if (user.Oauth === String(userData.id)) {
      console.log(user.Oauth);
      const fetchUser = await userModel.getSingleUser(user.id);
      setSingleUser(fetchUser);
    }
  });

  // /** @type {Array} filter bikes depending on status */
  // const filteredUser: Array<any> = users.filter((user: any) =>
  //   console.log(user.Oauth === String(userData.id)),
  // );

  // console.log(singleUser);

  return (
    <div className='App'>
      {singleUser.length === 0 ? (
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
        <Navigate to='/overview' replace={true} />
      )}
    </div>
  );
};

export default Home;
