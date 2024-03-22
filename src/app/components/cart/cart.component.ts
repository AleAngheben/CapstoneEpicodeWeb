import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductOnSell } from 'src/app/interfaces/new-product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/interfaces/cart';
import { Item } from 'src/app/interfaces/item';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { PaymentService } from 'src/app/services/payment.service';
import { Stripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsOnCart: Item[] | undefined = [];
  user: User | undefined;
  cart: Cart | undefined;
  stripeToken!: string;
  amount!: number;
  success!: boolean;
  error!: string;

  constructor(
    private cartSrv: CartService,
    private authSrv: AuthService,
    private snackBar: SnackBarComponent,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.loadMyCart();
  }

  //ricava carrello dell user loggato
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
      // this.getMyProductsOnSell();
    });
  }

  //al click deleta completamente l'item ( dal carrello )
  removeItemFromCart(itemId: string): void {
    this.cartSrv.deleteItemFromCart(itemId).subscribe(() => {
      this.loadMyCart();
      this.snackBar.yellowSnackbar('Elemento eliminato');
    });
  }

  //aggiunge 1 alla quantità del prodotto incrementato
  increaseItemQuantity(itemId: string): void {
    this.cartSrv.itemPlusOnCart(itemId).subscribe(() => {
      this.loadMyCart();
      this.snackBar.successSnackbar('Quantità aumentata');
    });
  }

  //diminuisce di 1 la quantità fino ad eliminarlo completamente dal carrello
  decreaseItemQuantity(productId: string): void {
    this.cartSrv.itemMinusOnCart(productId).subscribe(() => {
      this.loadMyCart();
      this.snackBar.yellowSnackbar('Quantità diminuita');
    });
  }
  onPayWithStripe() {
    const stripe = Stripe('pk_your_stripe_public_key'); // Sostituisci con la tua chiave pubblica
    const totalAmount = this.calculateTotalAmount(); // Calcola l'importo totale del carrello

    stripe
      .createPaymentRequest({
        amount: totalAmount * 100, // Converti in centesimi
        currency: 'eur',
        paymentMethods: ['card'],
        button: document.getElementById('stripe-button'),
      })
      .then((data) => {
        // Il pagamento è stato completato con successo
        this.s.confirmPayment(data.paymentIntent.id).subscribe(
          (response) => {
            // Processa la risposta di conferma del pagamento dal backend
            console.log('Pagamento completato:', response);
          },
          (error) => {
            // Gestisci gli errori del backend
            console.error('Errore durante la conferma del pagamento:', error);
          }
        );
      })
      .catch((error) => {
        // Gestisci gli errori di Stripe.js
        console.error('Errore Stripe:', error);
      });
  }

  calculateTotalAmount(): number {
    // Implementa la logica per calcolare l'importo totale del carrello
    return 1000; // Esempio (sostituisci con la tua logica)
  }
  // onClick() {
  //   this.paymentService.createCharge(this.stripeToken = , this.amount).subscribe(
  //     (charge) => {
  //       this.success = true;
  //       this.error = "";
  //     },
  //     (error) => {
  //       this.success = false;
  //       this.error = error.message;
  //     }
  //   );
  // }
}
