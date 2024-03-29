import React, { useState } from 'react';
import paymentModel from '../models/paymentModels';
import paymentModule from '../modules/paymentModule';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import Toast from './Toast';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const InvoicesMonthly = ({ invoices, user, creditCard, truncPan }: any) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [, setSelectedMonth] = useState(0);

  function checkStatusMessage(status: number): string {
    const message = paymentModule.checkStatus(status);
    return message;
  }

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

  function getMonthFromDate(dateString: string) {
    const date = new Date(dateString);
    return date.getMonth();
  }

  function getDateDifferenceInDays(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  async function doPaymentMonthly(id: any, invoiceMonth: any) {
    const filteredArray = invoiceMonth.filter(
      (invoice: any) => invoice.Status === 10 || invoice.Status === 30,
    );

    if (filteredArray.length === 0) {
      setToastMessage('No invoices to pay');
      setShowToast(true);
    } else {
      const expires = formatDate(filteredArray[0].Expires);
      try {
        await paymentModel.payOneInvoiceMonthly(id, 'balance', expires);
        setToastMessage('Invoice payed.');
        setShowToast(true);
      } catch (error) {
        console.error(error);
        setToastMessage('Could not pay invoice, try again.');
        setShowToast(true);
      }
    }
  }

  async function doPaymentMonthlyCard(id: any, invoiceMonth: any) {
    const filteredArray = invoiceMonth.filter(
      (invoice: any) => invoice.Status === 10 || invoice.Status === 30,
    );
    if (filteredArray.length === 0) {
      setToastMessage('No invoices to pay');
      setShowToast(true);
    } else {
      const expires = formatDate(filteredArray[0].Expires);
      try {
        await paymentModel.payOneInvoiceMonthly(id, 'card', expires);
        setToastMessage('Invoices payed.');
        setShowToast(true);
      } catch (error) {
        console.error(error);
        setToastMessage('Could not pay invoice, try again.');
        setShowToast(true);
      }
    }
  }

  return (
    <>
      {showToast && <Toast message={toastMessage} />}
      <div className='invoices-container'>
        <>
          <h1>Invoices to pay</h1>
          <Tabs>
            <TabList>
              {months.map((month, index) => (
                <Tab
                  className='selected-month'
                  key={index}
                  onSelect={() => setSelectedMonth(index)}
                >
                  {month}
                </Tab>
              ))}
            </TabList>
            {months.map((month, index) => {
              const invoicesForMonth = invoices.filter((invoice: any) => {
                const daysBetween = getDateDifferenceInDays(invoice.Created, invoice.Expires);
                return getMonthFromDate(invoice.Expires) === index && daysBetween > 31;
              });
              return (
                <TabPanel key={index}>
                  <table className='pricing-table'>
                    <thead className='pricing-table-head'>
                      <tr className='pricing-table-row'>
                        <th>Amount (SEK)</th>
                        <th>Created</th>
                        <th>Expires</th>
                        <th>Paid</th>
                        <th>Rent id</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className='pricing-table-body'>
                      {invoicesForMonth
                        // .filter((invoice: any) => invoice.Status === 10 || invoice.Status === 30)
                        .map((invoice: any) => (
                          <tr key={invoice.id}>
                            <td>{invoice.Amount}</td>
                            <td>{formatDate(invoice.Created)}</td>
                            <td>{formatDate(invoice.Expires)}</td>
                            <td>{formatDate(invoice.Paid)}</td>
                            <td>{invoice.Rents_id}</td>
                            <td>{checkStatusMessage(invoice.Status)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className='btn-container'>
                    <p>
                      Wait until current month is over before you pay your invoices for current
                      month.
                    </p>
                    <button
                      className='pay-button'
                      onClick={() => doPaymentMonthly(user.id, invoicesForMonth)}
                    >
                      Pay invoices with balance
                    </button>
                    {Object.keys(creditCard).length === 0 ? (
                      <p></p>
                    ) : (
                      <button
                        className='pay-button'
                        onClick={() => doPaymentMonthlyCard(user.id, invoicesForMonth)}
                      >
                        Pay with credit card ****{truncPan}
                      </button>
                    )}
                  </div>
                </TabPanel>
              );
            })}
          </Tabs>
        </>
      </div>
    </>
  );
};

export default InvoicesMonthly;
