export interface AuthData {
  token: string;
  user: {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
  };
}
