import axios from 'axios';

const authModel = {
  getUser: async function getUser() {
    const usr = await axios
      .get('http://localhost:4000/get-cookie', {
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res: any) => res.data);
    return usr;
  },
  logout: async function logout() {
    await axios.get('http://localhost:4000/clear-cookie', {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
      },
    }).then((res: any) => res.data);
  },
};

export default authModel;
