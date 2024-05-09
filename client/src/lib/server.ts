export class Server {
  public readonly _chatServer = `http://communication-service:8000`;
  private baseUrl: string = "http://localhost";
  private type: string = "-container";
  constructor() {
    const isPro = process.env.NEXT_PUBLIC_IS_PRODUCTION;
    console.log(process.env.NEXT_PUBLIC_NODE_IP, "this is node ip");
    console.log(process.env.NEXT_PUBLIC_MINIKUBE_IP, "minikube ip from env.");
    if (isPro) {
      this.baseUrl = "http://carreralink.com";
      this.type = "-service";
    } else console.log("This is production code!!!!!");

    return this;
  }

  auth(path: string) {
    const auth = `/api/v1/auth`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://auth" + this.type}:4000${auth}/${path}`;
  }
  user(path: string) {
    const user = `/api/v1/users`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://user" + this.type}:5000${user}/${path}`;
  }
  adminUser(path: string) {
    const user = `/api/v1/users/admin`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://user" + this.type}:5000${user}/${path}`;
  }
  adminCompany(path: string) {
    const company = `/api/v1/companies/admin`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://company" + this.type}:8080${company}/${path}`;
  }
  company(path: string) {
    const company = `/api/v1/companies`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://company" + this.type}:8080${company}/${path}`;
  }
  jobs(path: string) {
    const jobs = `/api/v1/companies/jobs`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://company" + this.type}:8080${jobs}/${path}`;
  }
  recruiter(path: string) {
    const recruiter = `/api/v1/companies/recruiter`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://company" + this.type}:8080${recruiter}/${path}`;
  }

  interview(path: string) {
    const interview = `/api/v1/companies/interview`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://company" + this.type}:8080${interview}/${path}`;
  }
  ai(path: string) {
    const ai = `/api/v1/ai`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://ai" + this.type}:7000${ai}/${path}`;
  }
  chat(path: string) {
    const chat = `/api/v1/communication/chat`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://communication" + this.type}:8000${chat}/${path}`;
  }
  skillAndCategory(path: string) {
    const skillAndCategory = `/api/v1/admin/skillAndCategory`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://admin" + this.type}:9000${skillAndCategory}/${path}`;
  }
  plan(path: string) {
    const plan = `/api/v1/admin/plan`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://admin" + this.type}:9000${plan}/${path}`;
  }

  userPlan(path: string) {
    const userPlan = `/api/v1/admin/plan/user`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://admin" + this.type}:9000${userPlan}/${path}`;
  }

  payment(path: string) {
    const payment = `/api/v1/order/payment`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://order" + this.type}:10000${payment}/${path}`;
  }

  order(path: string) {
    const order = `/api/v1/order`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://order" + this.type}:10000${order}/${path}`;
  }

  compiler(path: string) {
    const compiler = `/api/v1/compiler`;
    return `${typeof window !== "undefined" ? this.baseUrl : "http://compiler" + this.type}:11000${compiler}/${path}`;
  }
}

// export class Server {
//   public readonly _chatServer = `${typeof window !== "undefined" ? "localhost" : "communication-container"}:8000`;

//   constructor(private baseUrl: string = "http://") {
//     return this;
//   }

//   auth(path: string) {
//     const auth = `${typeof window !== "undefined" ? "localhost" : "auth-container"}:4000/api/v1/auth`;
//     return `${this.baseUrl}${auth}/${path}`;
//   }
//   user(path: string) {
//     const user = `${typeof window !== "undefined" ? "localhost" : "users-container"}:5000/api/v1/users`;
//     return `${this.baseUrl}${user}/${path}`;
//   }
//   adminUser(path: string) {
//     const user = `${typeof window !== "undefined" ? "localhost" : "users-container"}:5000/api/v1/users/admin`;
//     return `${this.baseUrl}${user}/${path}`;
//   }
//   adminCompany(path: string) {
//     const company = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/admin`;
//     return `${this.baseUrl}${company}/${path}`;
//   }
//   company(path: string) {
//     const company = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies`;
//     return `${this.baseUrl}${company}/${path}`;
//   }
//   jobs(path: string) {
//     const jobs = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/jobs`;
//     return `${this.baseUrl}${jobs}/${path}`;
//   }
//   recruiter(path: string) {
//     const recruiter = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/recruiter`;
//     return `${this.baseUrl}${recruiter}/${path}`;
//   }

//   interview(path: string) {
//     const interview = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/companies/interview`;
//     return `${this.baseUrl}${interview}/${path}`;
//   }
//   ai(path: string) {
//     const ai = `${typeof window !== "undefined" ? "localhost" : "ai-container"}:7000/api/v1/ai`;
//     return `${this.baseUrl}${ai}/${path}`;
//   }
//   chat(path: string) {
//     const chat = `${typeof window !== "undefined" ? "localhost" : "communication-container"}:8000/api/v1/communication/chat`;
//     return `${this.baseUrl}${chat}/${path}`;
//   }
//   skillAndCategory(path: string) {
//     const skillAndCategory = `${typeof window !== "undefined" ? "localhost" : "admin-container"}:9000/api/v1/admin/skillAndCategory`;
//     return `${this.baseUrl}${skillAndCategory}/${path}`;
//   }
//   plan(path: string) {
//     const plan = `${typeof window !== "undefined" ? "localhost" : "admin-container"}:9000/api/v1/admin/plan`;
//     return `${this.baseUrl}${plan}/${path}`;
//   }

//   userPlan(path: string) {
//     const userPlan = `${typeof window !== "undefined" ? "localhost" : "admin-container"}:9000/api/v1/admin/plan/user`;
//     return `${this.baseUrl}${userPlan}/${path}`;
//   }

//   payment(path: string) {
//     const payment = `${typeof window !== "undefined" ? "localhost" : "order-container"}:10000/api/v1/order/payment`;
//     return `${this.baseUrl}${payment}/${path}`;
//   }

//   order(path: string) {
//     const order = `${typeof window !== "undefined" ? "localhost" : "order-container"}:10000/api/v1/order`;
//     return `${this.baseUrl}${order}/${path}`;
//   }

//   compiler(path: string) {
//     const compiler = `${typeof window !== "undefined" ? "localhost" : "compiler-container"}:11000/api/v1/compiler`;
//     return `${this.baseUrl}${compiler}/${path}`;
//   }
// }
