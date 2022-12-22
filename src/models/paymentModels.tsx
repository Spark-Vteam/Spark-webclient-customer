const paymentModels = {
  getInvoicesByUser: async function getInvoicesByUser(id: string) {
    const response = await fetch('http://localhost:4000/invoice/user/1');

    const invoice = await response.json();

    return invoice.data;
  },
  updateBalance: async function updateBalance(id: string, balance: string) {
    const updatedBalance = {
      balance: parseInt(balance),
    };

    fetch('http://localhost:4000/user/balance/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBalance),
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

export default paymentModels;
