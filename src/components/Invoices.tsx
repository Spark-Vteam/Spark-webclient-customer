import React, { useState } from 'react';
import paymentModel from '../models/paymentModels';
import paymentModule from '../modules/paymentModule';
import InvoicesMonthly from '../components/InvoicesMonthly';

import Toast from './Toast';

/**
  Invoices component for displaying a list of invoices
  @param invoices - list of invoices
  @param user - current user
  @param creditCard - credit card information
  @param truncPan - truncated version of credit card number
*/
const Invoices = ({ invoices, user, creditCard, truncPan }: any) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  /**
    Check the status message of an invoice based on its status code
    @param status - status code of the invoice
    @returns string - message corresponding to the status code
  */
  function checkStatusMessage(status: number): string {
    const message = paymentModule.checkStatus(status);
    return message;
  }

  /**
    Format a date string
    @param dateString - string representation of the date
    @returns string - formatted date string
    */
  function formatDate(dateString: string): string {
    if (dateString === null) {
      return '-';
    } else {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }

  /**
    Make a payment for a single invoice
    @param event - payment event
    */
  async function doPayment(event: any) {
    event.preventDefault();

    const invoiceId = event.target.value;

    try {
      await paymentModel.payOneInvoice(invoiceId, 'balance', user.id);
      setToastMessage('Invoice payed.');
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMessage('Could not pay invoice, try again.');
      setShowToast(true);
    }
  }

  /**
    Make a monthly payment for a single invoice using a credit card
    @param invoiceId - id of the invoice to pay
    @param expires - expiration date of the credit card
    */
  async function doPaymentMonthly(invoiceId: any, expires: any) {
    try {
      await paymentModel.payOneInvoiceMonthly(invoiceId, 'balance', expires);
      setToastMessage(`Invoice payed with card ${truncPan}.`);
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMessage('Could not pay invoice, try again.');
      setShowToast(true);
    }
  }

  return (
    <>
      {showToast && <Toast message={toastMessage} data-testid='toast' />}
      <div className='invoices-container' data-testid='invoices-container'>
        {user.PartialPayment === 0 ? (
          <>
            <h1>Invoices</h1>
            <table className='pricing-table' data-testid='pricing-table'>
              <thead className='pricing-table-head' data-testid='pricing-table-head'>
                <tr className='pricing-table-row' data-testid='pricing-table-row'>
                  <th>Amount (SEK)</th>
                  <th>Created</th>
                  <th>Expires</th>
                  <th>Paid</th>
                  <th>Rent id</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody data-testid='pricing-table-body' className='pricing-table-body'>
                {invoices.map((invoice: any) => (
                  <tr key={invoice.id}>
                    <td>{invoice.Amount}</td>
                    <td data-testid='invoice-row'>{formatDate(invoice.Created)}</td>
                    <td>{formatDate(invoice.Expires)}</td>
                    <td>{formatDate(invoice.Paid)}</td>
                    <td>{invoice.Rents_id}</td>
                    <td>{checkStatusMessage(invoice.Status)}</td>
                    {user.PartialPayment === 0 &&
                    invoice.Status !== 40 &&
                    user.PartialPayment === 0 &&
                    user.Balance + 1 >= invoice.Amount &&
                    user.PartialPayment === 0 &&
                    invoice.Status !== 20 ? (
                      <td>
                        <button value={invoice.id} onClick={doPayment}>
                          Pay with balance
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {Object.keys(creditCard).length === 0 ||
                    invoice.Status === 40 ||
                    invoice.Status === 20 ? (
                      <td></td>
                    ) : (
                      <td>
                        <button
                          value={invoice.id}
                          onClick={() => doPaymentMonthly(invoice.id, invoice.Expires)}
                        >
                          Pay with credit card ****{truncPan}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <InvoicesMonthly
            user={user}
            invoices={invoices}
            creditCard={creditCard}
            truncPan={truncPan}
          />
        )}
      </div>
    </>
  );
};

export default Invoices;
