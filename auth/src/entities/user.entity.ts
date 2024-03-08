export interface IUser {
  username: string;
  password: string;
  contact: number;
  role: "user" | "admin" | "recruiter";
  email: string;
}

export class User implements IUser {
  username: string;
  password: string;
  contact: number;
  role: "user" | "admin" | "recruiter";
  email: string;

  constructor({ username, password, contact, role, email }: IUser) {
    this.username = username;
    this.password = password;
    this.contact = contact;
    this.role = role;
    this.email = email;
  }
}
