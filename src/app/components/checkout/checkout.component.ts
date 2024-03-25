import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart, Country } from 'src/app/interfaces/cart';
import { Item } from 'src/app/interfaces/item';
import { User } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  productsOnCart: Item[] | undefined = [];
  user: User | undefined;
  cart: Cart | undefined;
  //gestione input pagamento
  selectedMethod: string = 'card';
  cardType: string = 'card';
  cashType: string = 'cash';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  showCVV: boolean = false;
  cardBusiness: string = '';
  //per country
  selectedCountry: string = '';
  countries: Country[] = [];

  //per la checkbox
  isChecked: boolean = false;

  constructor(
    private cartSrv: CartService,
    private authSrv: AuthService,
    private http: HttpClient
  ) {
    this.getAllCountries();
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.loadMyCart();
  }

  loadMyCart(): void {
    this.cartSrv.getMyCart().subscribe((products: Cart) => {
      this.cart = products;
      this.productsOnCart = products.items;
    });
  }
  clearCart(cartId: string): void {
    this.cartSrv.clearCart(cartId).subscribe(() => {
      this.loadMyCart();
    });
  }
  //ricava user loggato
  getUserProfile(): void {
    this.authSrv.getMyProfile().subscribe((user: User) => {
      this.user = user;
    });
  }

  //per scelta pagamento
  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  //per card Number
  onInput(event: any) {
    let cardNumber = event.target.value.replace(/\D/g, '');

    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();

    this.cardNumber = cardNumber.slice(0, 19);
    this.checkCardType(this.cardNumber);
  }

  checkCardType(cardNumber: string): void {
    if (cardNumber.startsWith('4')) {
      this.cardBusiness = 'visa';
    } else if (cardNumber.startsWith('5')) {
      this.cardBusiness = 'mastercard';
    } else if (cardNumber.startsWith('3')) {
      this.cardBusiness = 'amex';
    } else {
      this.cardBusiness = ''; // Resetta il tipo di carta se non corrisponde a nessuno dei tipi conosciuti
    }
  }

  //per la data
  formatExpiryDate(event: any) {
    let date = event.target.value.replace(/[^\d/]/g, '');

    if (date.length > 2 && date.indexOf('/') === -1) {
      date = date.slice(0, 2) + '/' + date.slice(2);
    }

    date = date.slice(0, 5);

    this.expiryDate = date;
  }

  //cvv
  formatCVV(event: any) {
    let cvv = event.target.value.replace(/\D/g, '');
    cvv = cvv.slice(0, 3);
    this.cvv = cvv;
  }

  toggleCVVVisibility() {
    this.showCVV = !this.showCVV;
  }

  //per country
  getAllCountries() {
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe((data) => {
        this.countries = data.map((country) => ({ name: country.name.common }));
      });
  }
}
