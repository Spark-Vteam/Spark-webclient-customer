const rentsByUserModels = {
  getRentsByUser: async function getRentsByUser(id: string) {
    const response = await fetch(`http://localhost:4000/v1/rent/user/${id}`, {
      headers: {
        'key': '18c364b7-641e-440e-849a-20a3c67036a1'
      }
    });

    const user = await response.json();

    return user.data;
  },
};

export default rentsByUserModels;
