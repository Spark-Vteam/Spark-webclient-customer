import { useState, useEffect, Fragment } from 'react';
import Navbar from './Navbar';
import rentModel from '../models/rentModels';
// importing Link from react-router-dom to navigate to

const History = ({ userData, logout, singleUser }: any) => {
  const [rents, setRents] = useState([]);

  const user = singleUser;
  /**
   * fetch users from API
   * @returns {Promise<void>}
   */
  async function fetchRents(): Promise<void> {
    const users = await rentModel.getRentsByUser(user.id);
    setRents(users);
  }

  useEffect(() => {
    (async () => {
      await fetchRents();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getDate(currentDate: string) {
    const date = new Date(currentDate);
    const dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return dateMDY;
  }

  function getCity(coordinates: string) {
    if (coordinates.split(',')[0][1] === '5') {
      return 'Lund';
    } else if (coordinates.split(',')[0][1] === '6') {
      return 'Karlskrona';
    }
    return 'Stockholm';
  }

  function timeDifference(timestamp1: string, timestamp2: string) {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const date1InMilliseconds = date1.getTime();
    const date2InMilliseconds = date2.getTime();

    const differenceInMilliseconds = Math.abs(date1InMilliseconds - date2InMilliseconds);

    const minutes = Math.floor(differenceInMilliseconds / 1000 / 60);
    const seconds = Math.floor(differenceInMilliseconds / 1000) % 60;

    return `${minutes} minutes and ${seconds} seconds`;
  }

  console.log(rents);
  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <div className='container' data-testid='container'>
        <h1>History of your trips</h1>
        <div className='App-container'>
          {rents.map((rent: any) => (
            <div key={rent.id} data-testid='rent'>
              <Fragment key={rent.id}>
                <strong>Date: </strong>
                {getDate(rent.StartTimestamp)}
                <br />
                <strong>Price: </strong>
                {rent.Price} SEK
                <br />
                <strong>City: </strong>
                {getCity(rent.Start)}
                <br />
                <strong>Duration: </strong>
                {timeDifference(rent.DestinationTimestamp, rent.StartTimestamp)}
                <hr />
              </Fragment>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
