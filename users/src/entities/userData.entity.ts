export interface IUser {
  username: string;
  contact: number;
  role: "user" | "recruiter";
  email: string;
}

export class User implements IUser {
  username: string;
  contact: number;
  role: "user" | "recruiter";
  email: string;

  constructor({ username, contact, role, email }: IUser) {
    this.username = username;
    this.contact = contact;
    this.role = role;
    this.email = email;
  }
}
