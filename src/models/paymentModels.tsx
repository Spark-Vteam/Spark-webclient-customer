import { CreditCard } from '../interfaces/payment'


const paymentModels = {
  getInvoicesByUser: async function getInvoicesByUser(id: string) {
    const response = await fetch('http://localhost:4000/v1/invoice/user/1');

    const invoice = await response.json();

    return invoice.data;
  },
  updateBalance: async function updateBalance(id: string, balance: string) {
    const updatedBalance = {
      balance: parseInt(balance),
    };

    fetch(`http://localhost:4000/v1/user/balance/${id}`, {
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
  payOneInvoice: async function payOneInvoice(invoiceId: string, id: string) {
    const userId = {
      id: id,
    };

    fetch(`http://localhost:4000/v1/invoice/pay/${invoiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        return err;
      });
    return 'success';
  },
  insertCreditCard: async function insertCreditCard(id: string, creditCard: CreditCard) {
    const userId = {
      id: id,
    };

    console.log(userId, creditCard)

    // fetch(`http://localhost:4000/v1/invoice/pay/${invoiceId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userId),
    // })
    //   .then((res) => {
    //     res.json();
    //   })
    //   .catch((err) => {
    //     return err;
    //   });
    // return 'success';
  },
};

export default paymentModels;
