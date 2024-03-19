export interface ICompany {
  password: string;
  email: string;
}

export class Company implements ICompany {
  password: string;
  email: string;

  constructor({ password, email }: ICompany) {
    this.password = password;
    this.email = email;
  }
}
