import React from 'react';
// importing Link from react-router-dom to navigate to


const Overview = (user: any) => {
  return (
    <div>
    {/* <Navbar /> */}
      <h2>LOGIN SUCCEDED!</h2>
      <h3>Welcome {user.user}</h3>
    </div>
  );
};

export default Overview;
