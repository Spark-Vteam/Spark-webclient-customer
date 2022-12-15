import Navbar from './Navbar';
// importing Link from react-router-dom to navigate to

const Overview = ({ userData, logout, singleUser }: any) => {
  const today = new Date();
  const curHr = today.getHours();
  let message = '';

  if (curHr < 12) {
    message = 'Good morning';
  } else if (curHr < 18) {
    message = 'Good afternoon';
  } else {
    message = 'Good evening';
  }

  console.log(singleUser);
  return (
    <div className='App'>
      <Navbar userData={userData} logout={logout} />
      <div className='App2'>
        <h2>{message}!</h2>
      </div>
    </div>
  );
};

export default Overview;
