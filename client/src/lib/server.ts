export class Server {
  public readonly _chatServer: string = `http://communication-service:8000`;
  private baseUrl: string = "/";
  private isProduction: boolean = false;
  constructor() {
    const isDev = process.env.NEXT_PUBLIC_IS_DEVELOPMENT;
    const ip = process.env.NEXT_PUBLIC_NODE_IP;
    if (ip) {
      this._chatServer = `http://${ip}:30000`;
    }
    if (!isDev) {
      this.isProduction = true;
    } else console.log("This is development code!!!!!");

    return this;
  }

  createPath({
    actualPath,
    port,
    path,
    service,
  }: {
    actualPath: string;
    port: number;
    path: string;
    service:
      | "admin"
      | "ai"
      | "auth"
      | "communication"
      | "company"
      | "compiler"
      | "order"
      | "user";
  }) {
    const isInClient = typeof window !== "undefined";
    // if isInClient true then the request is from the browser.

    if (this.isProduction) {
      if (isInClient) {
        return this.baseUrl.concat(actualPath, "/", path);
      } else {
        return `http://${service}-service:${port}${actualPath}/${path}`;
      }
    } else {
      if (isInClient) {
        return this.baseUrl.concat(`:${port}`, actualPath, "/", path);
      } else {
        return `http://${service}-container:${port}${actualPath}/${path}`;
      }
    }
  }

  auth(path: string) {
    const auth = `api/v1/auth`;
    const port = 4000;
    return this.createPath({
      actualPath: auth,
      path,
      port,
      service: "auth",
    });
  }
  user(path: string) {
    const user = `api/v1/users`;
    const port = 5000;
    return this.createPath({
      actualPath: user,
      path,
      port,
      service: "user",
    });
  }
  adminUser(path: string) {
    const user = `api/v1/users/admin`;
    const port = 5000;
    return this.createPath({
      actualPath: user,
      path,
      port,
      service: "user",
    });
  }
  adminCompany(path: string) {
    const company = `api/v1/company/admin`;
    const port = 8080;
    return this.createPath({
      actualPath: company,
      path,
      port,
      service: "company",
    });
  }
  company(path: string) {
    const company = `api/v1/company`;
    const port = 8080;
    return this.createPath({
      actualPath: company,
      path,
      port,
      service: "company",
    });
  }
  jobs(path: string) {
    const jobs = `api/v1/company/jobs`;
    const port = 8080;
    return this.createPath({
      actualPath: jobs,
      path,
      port,
      service: "company",
    });
  }
  recruiter(path: string) {
    const recruiter = `api/v1/company/recruiter`;
    const port = 8080;
    return this.createPath({
      actualPath: recruiter,
      path,
      port,
      service: "company",
    });
  }

  interview(path: string) {
    const interview = `api/v1/company/interview`;
    const port = 8080;
    return this.createPath({
      actualPath: interview,
      path,
      port,
      service: "company",
    });
  }
  ai(path: string) {
    const ai = `api/v1/ai`;
    const port = 7000;
    return this.createPath({
      actualPath: ai,
      path,
      port,
      service: "ai",
    });
  }
  chat(path: string) {
    const chat = `api/v1/communication/chat`;
    const port = 8000;
    return this.createPath({
      actualPath: chat,
      path,
      port,
      service: "communication",
    });
  }
  skillAndCategory(path: string) {
    const skillAndCategory = `api/v1/admin/skillAndCategory`;
    const port = 9000;
    return this.createPath({
      actualPath: skillAndCategory,
      path,
      port,
      service: "admin",
    });
  }
  plan(path: string) {
    const plan = `api/v1/admin/plan`;
    const port = 9000;
    return this.createPath({
      actualPath: plan,
      path,
      port,
      service: "admin",
    });
  }

  userPlan(path: string) {
    const userPlan = `api/v1/admin/plan/user`;
    const port = 9000;
    return this.createPath({
      actualPath: userPlan,
      path,
      port,
      service: "admin",
    });
  }

  payment(path: string) {
    const payment = `api/v1/order/payment`;
    const port = 10000;
    return this.createPath({
      actualPath: payment,
      path,
      port,
      service: "order",
    });
  }

  order(path: string) {
    const order = `api/v1/order`;
    const port = 10000;
    return this.createPath({
      actualPath: order,
      path,
      port,
      service: "order",
    });
  }

  compiler(path: string) {
    const compiler = `api/v1/compiler`;
    const port = 11000;
    return this.createPath({
      actualPath: compiler,
      path,
      port,
      service: "compiler",
    });
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
//     const company = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/company/admin`;
//     return `${this.baseUrl}${company}/${path}`;
//   }
//   company(path: string) {
//     const company = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/company`;
//     return `${this.baseUrl}${company}/${path}`;
//   }
//   jobs(path: string) {
//     const jobs = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/company/jobs`;
//     return `${this.baseUrl}${jobs}/${path}`;
//   }
//   recruiter(path: string) {
//     const recruiter = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/company/recruiter`;
//     return `${this.baseUrl}${recruiter}/${path}`;
//   }

//   interview(path: string) {
//     const interview = `${typeof window !== "undefined" ? "localhost" : "company-container"}:8080/api/v1/company/interview`;
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
