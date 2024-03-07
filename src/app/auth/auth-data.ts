export interface AuthData {
  accessToken: string;
  user: {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
  };
}
