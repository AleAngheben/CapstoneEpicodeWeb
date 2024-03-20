import { Product } from './new-product';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatarUrl: string;
  username: string;
  role: string;
  productsOnSell: Product[];
}

export interface UserAvatar {
  avatarUrl: string;
}
export interface ModifyUser {
  name: string;
  surname: string;
  email: string;
  username: string;
}
