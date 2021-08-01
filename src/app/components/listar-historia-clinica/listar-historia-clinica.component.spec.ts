import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHistoriaClinicaComponent } from './listar-historia-clinica.component';

describe('ListarHistoriaClinicaComponent', () => {
  let component: ListarHistoriaClinicaComponent;
  let fixture: ComponentFixture<ListarHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
