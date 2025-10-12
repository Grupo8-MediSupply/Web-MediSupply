import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
})
export class LoginRegisterComponent implements OnInit {
  error403: boolean = false;
  error423: boolean = false;
  error400: boolean = false;
  loginMode: boolean = true;
  loginRequested: boolean = false;
  registerRequested: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  registerForm = new FormGroup({
    nombres: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    apellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly dialog = inject(MatDialog);
  private readonly authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!!email) this.router.navigate(['/app']);
  }

  public changeMode() {
    this.loginMode = !this.loginMode;
  }

  public onSubmitLogin() {
    this.loginRequested = true;
    console.log(
      this.loginForm.value,
      this.loginForm.valid,
      this.loginForm.controls.email.errors,
    );
    if (this.loginForm.valid) {
      type LoginPayload = { email: string; password: string };
      interface LoginResponse {
        token?: string;
        [key: string]: unknown;
      }
      const payload = this.loginForm.value as LoginPayload;

      (this.loginService.login(payload) as Observable<LoginResponse>).subscribe(
        {
          next: (response: LoginResponse) => {
            this.error400 = false;
            this.error403 = false;
            this.error423 = false;
            console.log('Login successful', response);
            localStorage.setItem('email', payload.email || '');
            if (response.token) {
              localStorage.setItem('token', response.token);
            }
            this.router.navigateByUrl('/app/lista-alarmas');
          },
          error: (error: unknown) => {
            console.error('Login failed', error);
            this.error400 = (error as any)?.status === 400;
            this.error403 = (error as any)?.status === 403;
            this.error423 = (error as any)?.status === 423;
          },
        },
      );
    }
  }

  public onSubmitRegister() {
    this.registerRequested = true;
    if (this.registerForm.valid) {
      localStorage.setItem(
        'email',
        this.loginForm.value.email || 'ya viene lleno',
      );
      this.router.navigateByUrl('/app/lista-alarmas');
    }
  }

  public openDialog() {
    this.dialog.open(RememberPasswordDialog);
  }
}

// Elemento auxiliar para el componente LoginRegisterComponent
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'remember-password-dialog',
  standalone: true,
  template: `<h2 mat-dialog-title>Recordar Contraseña</h2>
    <mat-dialog-content
      >Se ha enviado un token de autenticación a tu correo.</mat-dialog-content
    >
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>`,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    MatDialogTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RememberPasswordDialog {}
