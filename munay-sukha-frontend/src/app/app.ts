import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router'; // Importar Router y eventos
import { HeaderComponent } from './components/header/header'; // Importar tu Header
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent], // Agregar HeaderComponent
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { // O AppComponent

  showHeader: boolean = true;

  constructor(private router: Router) {
    // Escuchar cambios de ruta para decidir si mostrar el header
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      // Ocultar en login y register
      this.showHeader = !url.includes('/login') && !url.includes('/register');
    });
  }
}