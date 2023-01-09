export interface User {
  id: string;
  Balance: number;
  EmailAdress: string;
  FirstName: string;
  LastName: string;
  Oauth: string;
  PartialPayment: number;
  Password: string;
  PhoneNumber: string;
}

export interface HistoryProps {
  userData: {
    id: string;
  };
  logout: () => void;
  singleUser: User;
}

export interface HomeProps {
  userData: {
    id: string;
  };
  logout: () => void;
}
