interface IRequestUser {
  id: string;
  email: string;
}

declare module "express" {
  export interface Request {
    user: IRequestUser | undefined;
  }
}
