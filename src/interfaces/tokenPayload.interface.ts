export interface ITokenPaylaod {
  user: {
    _id: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
    count: number;
  };
}
