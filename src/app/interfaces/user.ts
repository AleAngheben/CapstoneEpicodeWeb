import { Product } from './new-product';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  type: string;
  productsOnSell: Product[];
}
