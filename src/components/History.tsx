import { useState, useEffect, Fragment } from 'react';
import Navbar from './Navbar';
import rentModel from '../models/rentModels';

/**
 * A component for displaying a user's rental history
 */
const History = ({ userData, logout, singleUser }: any) => {
  /**
   * The state for the user's rentals
   */
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

  /**
   * Calls the `fetchRents` function when the component mounts
   */
  useEffect(() => {
    (async () => {
      await fetchRents();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Formats a date string
   * @param currentDate The date to format
   * @returns The formatted date string
   */
  function getDate(currentDate: string) {
    const date = new Date(currentDate);
    const dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return dateMDY;
  }

  /**
   * Gets the city for a set of coordinates
   * @param coordinates The coordinates to get the city for
   * @returns The city for the coordinates
   */
  function getCity(coordinates: string) {
    if (coordinates.split(',')[0][1] === '5') {
      return 'Lund';
    } else if (coordinates.split(',')[0][1] === '6') {
      return 'Karlskrona';
    }
    return 'Stockholm';
  }

  /**
   * Calculates the difference in time between two timestamps
   * @param timestamp1 The first timestamp
   * @param timestamp2 The second timestamp
   * @returns the time in minutes and seconds
   */
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

  console.log(rents.length);
  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <div className='container' data-testid='container'>
        <h1>History of your trips</h1>
        {rents.length === 0 ? (
          <div className='App-container'>
            <p>
              Seems like you have not yet experienced the convenience and eco-friendliness of
              traveling with Spark e-bike. Now is the perfect time to give it a try! Simply visit
              the Spark app on your device and start a new journey. With Spark, you can easily
              navigate the city and reach your destination without the hassle of traffic or finding
              a parking spot. Plus, you can feel good about using a mode of transportation that is
              better for the environment. Do not wait any longer, start your first Spark e-bike trip
              today!
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default History;
