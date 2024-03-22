export class Server {
  constructor(private baseUrl: string = "http://") {
    return this;
  }

  auth(path: string) {
    const auth = `${typeof window !== "undefined" ? "localhost" : "auth-container"}:4000/api/v1/auth`;
    return `${this.baseUrl}${auth}/${path}`;
  }
  user(path: string) {
    const user = `${typeof window !== "undefined" ? "localhost" : "users-container"}:5000/api/v1/users`;
    return `${this.baseUrl}${user}/${path}`;
  }
  company(path: string) {
    const company = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies`;
    return `${this.baseUrl}${company}/${path}`;
  }
  jobs(path: string) {
    const company = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/jobs`;
    return `${this.baseUrl}${company}/${path}`;
  }
}