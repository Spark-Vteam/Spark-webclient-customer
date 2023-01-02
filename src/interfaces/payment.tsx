export interface Invoice {
  Amount: number;
  Created: string;
  Expires: string;
  Paid: string;
  Rents_id: number;
  Status: number;
  Users_id: number;
  id: number;
}

export interface InvoiceProps {
  invoices: Invoice[];
}

export interface CreditCard {
  cardNumber: string;
  expiry: string;
  firstName: string;
  lastName: string;
  truncatedCardNumber: string;
}
