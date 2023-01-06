import { CreditCard } from '../interfaces/payment';

const paymentModels = {
  getInvoicesByUser: async function getInvoicesByUser(id: string) {
    const response = await fetch(`http://localhost:4000/v1/invoice/user/${id}`);

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
  payOneInvoiceMonthly: async function payOneInvoiceMonthly(invoiceId: string, expires: string) {
    const exp = {
      expires: expires,
    };

    fetch(`http://localhost:4000/v1/invoice/pay_monthly/${invoiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exp),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        return err;
      });
    return 'success';
  },
  insertCreditCard: async function insertCreditCard(id: string, card: CreditCard) {
    const creditCardInfo = {
      pan: card.pan,
      expiry: card.expiry,
      firstName: card.firstName,
      lastName: card.lastName,
      truncpan: card.pan.slice(-4),
    };

    fetch(`http://localhost:4000/v1/creditCard/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creditCardInfo),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        return err;
      });
    return 'success';
  },
  getCreditCards: async function getCreditCards(id: string) {
    const response = await fetch(`http://localhost:4000/v1/creditcard/${id}`);

    const creditCard = await response.json();

    return creditCard.data;
  },
};

export default paymentModels;
