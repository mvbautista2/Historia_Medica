import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTratamientosComponent } from './listado-tratamientos.component';

describe('ListadoTratamientosComponent', () => {
  let component: ListadoTratamientosComponent;
  let fixture: ComponentFixture<ListadoTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTratamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
