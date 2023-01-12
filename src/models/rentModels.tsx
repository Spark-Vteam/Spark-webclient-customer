const key = process.env.REACT_APP_API_KEY as string;

const rentsByUserModels = {
  getRentsByUser: async function getRentsByUser(id: string) {
    const response = await fetch(`http://localhost:4000/v1/rent/user/${id}`, {
      headers: {
        key: key,
      },
    });

    const user = await response.json();

    return user.data;
  },
};

export default rentsByUserModels;
