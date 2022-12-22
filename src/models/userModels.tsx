const userModels = {
  getUsers: async function getUsers() {
    const response = await fetch('http://localhost:4000/user');

    const user = await response.json();

    return user.data;
  },
  postUser: async function postUser(insertedUser: any) {
    fetch('http://localhost:4000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insertedUser),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        return err;
      });
    return 'success';
  },
  updateUser: async function updateUser(id: string, insertedUser: any) {
    fetch(`http://localhost:4000/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insertedUser),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        return err;
      });
    return 'success';
  },
  getSingleUser: async function getSingleUser(id: string) {
    const response = await fetch(`http://localhost:4000/user/${id}`);

    const user = await response.json();

    return user.data;
  },
};

export default userModels;
