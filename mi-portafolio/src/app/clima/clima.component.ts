import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [HttpClientModule, CommonModule], 
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {
  ciudad: string = '';
  temperatura: number = 0;
  sensacionTermica: number = 0; 
  descripcion: string = '';
  iconoUrl: string = '';
  humedad: number = 0;
  viento: number = 0;
  ciudadUsuario: any = null; 

  private apiKey: string = '961714040c67b450f0df895f1d5fb599'; //JORGE DEL FUTURO NO OLVIDES ESCONDER ESTO

  ciudadesPredefinidas: string[] = ['Tokio', 'Londres', 'Los Angeles', 'Ciudad de Mexico', 'Monterrey'];
  ciudades: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerUbicacionUsuario();
    this.cargarClimaCiudadesPredefinidas();
  }

  obtenerUbicacionUsuario() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.obtenerDatosClima(lat, lon);
        },
        (error) => {
          console.error('Error al obtener la ubicación', error);
        }
      );
    } else {
      console.error('La geolocalización no está soportada por este navegador.');
    }
  }

  cargarClimaCiudadesPredefinidas() {
    this.ciudadesPredefinidas.forEach(ciudad => {
      this.buscarCiudad(ciudad);
    });
  }

  buscarCiudad(nombreCiudad: string) {
    const url = `http://127.0.0.1:5003/ciudad?nombre=${nombreCiudad.toLowerCase()}&appid=${this.apiKey}`;
    
    this.http.get(url)
      .subscribe(
        (response: any) => {
          const lat = response.lat;
          const lon = response.lon;
          this.obtenerDatosClima(lat, lon, nombreCiudad);
        },
        (error) => {
          console.error('Error al obtener la latitud y longitud de la ciudad', error);
        }
      );
  }

  obtenerDatosClima(lat: number, lon: number, nombreCiudad?: string) {
    const url = `http://127.0.0.1:5003/clima?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    
    this.http.get(url)
      .subscribe(
        (response: any) => {
          const ciudadData = {
            ciudad: nombreCiudad || response.ciudad,
            temperatura: response.temperatura,
            sensacionTermica: response.sensacionTermica,
            descripcion: response.descripcion,
            iconoUrl: `http://openweathermap.org/img/wn/${response.icono}@2x.png`,
            humedad: response.humedad,
            viento: response.viento
          };
          if (nombreCiudad) {
            this.ciudades.push(ciudadData);
          } else {
            this.ciudadUsuario = ciudadData;
          }
        },
        (error) => {
          console.error('Error al obtener los datos del clima', error);
        }
      );
  }
}
