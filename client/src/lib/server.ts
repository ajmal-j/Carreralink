export class Server {
  constructor(private baseUrl: string = "http://") {
    return this;
  }

  auth(path: string) {
    const auth = "localhost:4000/api/v1/auth";
    return `${this.baseUrl}${auth}/${path}`;
  }
  user(path: string) {
    const user = "localhost:5000/api/v1/users";
    return `${this.baseUrl}${user}/${path}`;
  }
}

