import { Component } from '@angular/core';
import { ClimaComponent } from './clima/clima.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClimaComponent], // Importa el componente ClimaComponent
  template: '<app-clima></app-clima>'
})
export class AppComponent {}
