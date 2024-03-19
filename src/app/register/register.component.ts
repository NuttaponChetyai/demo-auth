import { Component } from '@angular/core';
import { UserForm } from '../models/user-form';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: UserForm = new UserForm();

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    const { username, password, email } = this.form;
    console.log('username : ' + username);
    console.log('email : ' + email);
    console.log('password : ' + password);
    this.storageService.saveUser({ username, email, password: "******" });
    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err.message },
        });
      },
    });
  }
}
