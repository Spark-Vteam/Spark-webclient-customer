import { User } from './user';

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
  pan: string;
  expiry: string;
  firstName: string;
  lastName: string;
  truncpan: string;
}

export interface ChoosePaymentProps {
  user: {
    id: string;
    PartialPayment: number;
  };
}

export interface CreditCardFormProps {
  user: {
    id: string;
  };
}

export interface InvoicesProps {
  invoices: Invoice[];
  user: User;
  creditCard: CreditCard;
  truncPan: string;
}
