declare module "express" {
  export interface Request {
    user?: {
      email: string;
      id: string;
    };
    companyData: { email: string | undefined; id: string | undefined };
  }
}
