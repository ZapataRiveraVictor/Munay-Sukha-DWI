import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required] // Campo extra para confirmar
    }, { 
      validators: this.passwordMatchValidator // <--- Validación Personalizada
    });
  }

  // Validador personalizado: Compara pass y confirmPass
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    this.mensajeError = '';
    
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Preparamos los datos (excluyendo confirmPassword que el backend no necesita)
    const { nombreCompleto, email, password } = this.registerForm.value;

    this.authService.register({ nombreCompleto, email, password }).subscribe({
      next: (res) => {
        this.mensajeExito = '¡Registro exitoso! Redirigiendo al login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        // Aquí capturamos el error "El correo ya existe" del backend
        if (err.error && typeof err.error === 'string') {
            this.mensajeError = err.error; 
        } else {
            this.mensajeError = 'Ocurrió un error al registrarse.';
        }
      }
    });
  }
}