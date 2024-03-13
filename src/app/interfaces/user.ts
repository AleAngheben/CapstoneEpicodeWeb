import { Product } from './new-product';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatarUrl: string;
  username: string;
  type: string;
  productsOnSell: Product[];
}

export interface UserAvatar {
  avatarUrl: string;
}
