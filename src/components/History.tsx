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
    // Konvertera tidsstämpeln till ett Date-objekt
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    // Konvertera datumen till millisekunder med hjälp av getTime()
    const date1InMilliseconds = date1.getTime();
    const date2InMilliseconds = date2.getTime();

    // Beräkna skillnaden i millisekunder
    const differenceInMilliseconds = Math.abs(date1InMilliseconds - date2InMilliseconds);

    // Konvertera millisekunder till minuter och sekunder
    const minutes = Math.floor(differenceInMilliseconds / 1000 / 60);
    const seconds = Math.floor(differenceInMilliseconds / 1000) % 60;

    // Returnera resultatet som en sträng i formatet "X minuter Y sekunder"
    return `${minutes} minutes and ${seconds} seconds`;
  }

  console.log(rents);
  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <div className='container'>
        <h1>History of your trips</h1>
        <div className='App-container'>
          {rents.map((rent: any) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
