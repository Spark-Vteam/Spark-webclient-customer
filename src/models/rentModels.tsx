const rentsByUserModels = {
  getRentsByUser: async function getRentsByUser(id: string) {
    const response = await fetch(`http://localhost:4000/v1/rent/user/${id}`);

    console.log(response);

    const user = await response.json();

    return user.data;
  },
};

export default rentsByUserModels;
