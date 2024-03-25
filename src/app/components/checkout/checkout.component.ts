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

  //per card NUmber
  onInput(event: any) {
    // Rimuovi tutti i caratteri tranne i numeri
    let cardNumber = event.target.value.replace(/\D/g, '');

    // Aggiungi spazio ogni 4 numeri
    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();

    // Limita il numero di caratteri a 19 (4 blocchi di numeri con 3 spazi)
    this.cardNumber = cardNumber.slice(0, 19);
  }

  //per la data
  formatExpiryDate(event: any) {
    // Rimuovi tutti i caratteri tranne i numeri e lo slash
    let date = event.target.value.replace(/[^\d/]/g, '');

    // Formatta la data inserendo uno slash dopo i primi due numeri, se necessario
    if (date.length > 2 && date.indexOf('/') === -1) {
      date = date.slice(0, 2) + '/' + date.slice(2);
    }

    // Limita la lunghezza a 5 caratteri (MM/YY)
    date = date.slice(0, 5);

    // Assegna il valore al campo
    this.expiryDate = date;
  }

  //cvv
  formatCVV(event: any) {
    // Rimuovi tutti i caratteri tranne i numeri
    let cvv = event.target.value.replace(/\D/g, '');

    // Limita la lunghezza massima a 3 caratteri
    cvv = cvv.slice(0, 3);

    // Assegna il valore al campo
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
