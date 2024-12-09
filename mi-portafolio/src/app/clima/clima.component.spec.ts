import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaComponent } from './clima.component';

describe('ClimaComponent', () => {
  let component: ClimaComponent;
  let fixture: ComponentFixture<ClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display city name', () => {
    component.ciudad = 'Ciudad de México';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.ciudad h2')?.textContent).toContain('Ciudad de México');
  });

  it('should display temperature', () => {
    component.temperatura = 25;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.temp-valor')?.textContent).toContain('25°C');
  });

  // Puedes agregar más pruebas para verificar otras partes del componente
});