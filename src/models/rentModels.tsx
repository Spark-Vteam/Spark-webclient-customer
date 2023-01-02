const rentsByUserModels = {
  getRentsByUser: async function getRentsByUser(id: string) {
    console.log(id);
    // Hard coded 1 to see mockup data
    const response = await fetch('http://localhost:4000/v1/rent/user/1');

    const user = await response.json();

    return user;
  },
};

export default rentsByUserModels;
