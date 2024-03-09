import { User } from './user';

export interface NewProduct {
  name: string;
  description: string;
  price: number;
  type: string;
  productImg: string;
}

export interface ProductResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  productImg: string;
  seller: User;
}

export interface ProductOnSell {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  productImg: string;
  serllerName: string;
  sellerSurname: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
