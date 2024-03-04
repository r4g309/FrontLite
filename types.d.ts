export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface CompanyType {
  nit: string;
  name: string;
  phone: string;
  direction: string;
  products: string[];
}
