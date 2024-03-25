import { Item } from './item';

export interface Cart {
  id: string;
  items: Item[];
  cartPrice: number;
}

export interface Country {
  name: string;
}
