import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth'; // Importación limpia

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  standalone: true,
  // Componentes autónomos requieren importar sus módulos
  imports: [CommonModule, ReactiveFormsModule, RouterLink] 
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // 1. Definición del formulario con validaciones
    this.registerForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      // 2. Validator personalizado para verificar que las contraseñas coincidan
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  get f() { return this.registerForm.controls; }

  // Función de validación: verifica si el password es igual al confirmPassword
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    // Retorna un error si no coinciden
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.invalid) {
      // Muestra un error si las contraseñas no coinciden (del validador de grupo)
      if (this.registerForm.errors?.['mismatch']) {
        this.errorMessage = 'Las contraseñas no coinciden.';
      }
      return;
    }

    const { nombreCompleto, email, password } = this.registerForm.value;

    this.authService.register({ nombreCompleto, email, password }).subscribe({
      next: (data) => {
        // Éxito: Mostrar mensaje y limpiar formulario
        this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        this.registerForm.reset();
        this.submitted = false;
        // Opcional: Redirigir al login después de un breve delay
        setTimeout(() => this.router.navigate(['/login']), 2000); 
      },
      error: (err) => {
        // Fallo: El backend retornó un error (ej: el correo ya existe)
        this.errorMessage = err.error || 'Ocurrió un error en el registro. Inténtalo de nuevo.';
        console.error('Error de registro del Backend:', err);
      }
    });
  }
}