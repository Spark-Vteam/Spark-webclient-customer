const userModels = {
  getUsers: async function getUsers() {
    const response = await fetch('http://localhost:4000/v1/user');

    const user = await response.json();

    return user.data;
  },
  postUser: async function postUser(insertedUser: any) {
    fetch('http://localhost:4000/v1/user', {
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
    fetch(`http://localhost:4000/v1/user/${id}`, {
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
  setPartialPayment: async function setPartialPayment(id: string, balance: any) {
    const amount = {
      balance: parseInt(balance)
    }
    fetch(`http://localhost:4000/v1/user/partial_balance/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(amount),
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
    const response = await fetch(`http://localhost:4000/v1/user/${id}`);

    const user = await response.json();

    return user.data;
  },

  login: async function login(username: string, password: string) {
    const userInfo = {
      emailAdress: username,
      password: password,
    };
    try {
      const response = await fetch('http://localhost:4000/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const result = await response.json();
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('id', result.data.info.user._id);
      localStorage.setItem('email', result.data.info.user.email);
      //   window.location.href = '/protected';
      return result;
    } catch (error: any) {
      alert(error.message);
    }
  },
};

export default userModels;
