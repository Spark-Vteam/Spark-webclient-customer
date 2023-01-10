const rentsByUserModels = {
  getRentsByUser: async function getRentsByUser(id: string) {
    const response = await fetch('http://localhost:4000/v1/rent/user/1');

    console.log(response);

    const user = await response.json();

    return user;
  },
};

export default rentsByUserModels;
