import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  constructor(private _snackBar: MatSnackBar) {}

  successSnackbar(message: string, action: string = 'Chiudi') {
    this._snackBar.open(message, action, {
      panelClass: ['success-snackbar'],
      horizontalPosition: 'end',
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
  errorSnackbar(message: string, action: string = 'Chiudi') {
    this._snackBar.open(message, action, {
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
  yellowSnackbar(message: string, action: string = 'Chiudi') {
    this._snackBar.open(message, action, {
      panelClass: ['yellow-snackbar'],
      horizontalPosition: 'end',
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
}
