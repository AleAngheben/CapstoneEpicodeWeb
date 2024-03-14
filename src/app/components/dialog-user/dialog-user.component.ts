import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ModifyUser, User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
})
export class DialogUserComponent implements OnInit {
  user!: User;
  userForm!: FormGroup;

  constructor(
    private authSrv: AuthService,
    private UserSrv: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getUserProfile();
  }

  initForm() {
    if (
      this.user.name &&
      this.user.email &&
      this.user.surname &&
      this.user.username
    ) {
      this.userForm = this.fb.group({
        name: [this.user.name, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        surname: [this.user.surname, Validators.required],
        username: [this.user.username, Validators.required],
      });
    } else {
      console.log('caricamento dati');
    }
  }

  getUserProfile(): void {
    this.authSrv.getMyProfile().subscribe(
      (user: User) => {
        this.user = user;
        if (user && user.name) {
          this.initForm();
        }
      },
      (error) => {
        console.error('Errore nel recupero del profilo utente:', error);
      }
    );
  }

  modifyUser(form: NgForm) {
    this.UserSrv.updateUser(form.value).subscribe(() => {
      this.getUserProfile();
      this.dialog.closeAll();
    });
  }
}
