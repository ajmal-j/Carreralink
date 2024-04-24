export class Server {
  public readonly _chatServer = `${typeof window !== "undefined" ? "localhost" : "communication-container"}:8000`;

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
  adminUser(path: string) {
    const user = `${typeof window !== "undefined" ? "localhost" : "users-container"}:5000/api/v1/users/admin`;
    return `${this.baseUrl}${user}/${path}`;
  }
  adminCompany(path: string) {
    const company = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/admin`;
    return `${this.baseUrl}${company}/${path}`;
  }
  company(path: string) {
    const company = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies`;
    return `${this.baseUrl}${company}/${path}`;
  }
  jobs(path: string) {
    const jobs = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/jobs`;
    return `${this.baseUrl}${jobs}/${path}`;
  }
  recruiter(path: string) {
    const recruiter = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/recruiter`;
    return `${this.baseUrl}${recruiter}/${path}`;
  }

  interview(path: string) {
    const interview = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/interview`;
    return `${this.baseUrl}${interview}/${path}`;
  }
  ai(path: string) {
    const ai = `${typeof window !== "undefined" ? "localhost" : "ai-container"}:7000/api/v1/ai`;
    return `${this.baseUrl}${ai}/${path}`;
  }
  chat(path: string) {
    const chat = `${typeof window !== "undefined" ? "localhost" : "communication-container"}:8000/api/v1/communication/chat`;
    return `${this.baseUrl}${chat}/${path}`;
  }
  admin(path: string) {
    const admin = `${typeof window !== "undefined" ? "localhost" : "admin-container"}:9000/api/v1/admin`;
    return `${this.baseUrl}${admin}/${path}`;
  }
}
