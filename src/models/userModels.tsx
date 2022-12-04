const userModels = {
  getUsers: async function getUsers() {
    const response = await fetch('http://localhost:4000/user');

    const user = await response.json();

    return user[0];
  },
  postUser: async function postUser(insertUser: any) {
    fetch('http://localhost:4000/post???', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        insertUser,
      }),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        return err;
      });
    return 'success';
  },
};

export default userModels;
