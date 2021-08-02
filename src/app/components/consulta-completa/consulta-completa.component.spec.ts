import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCompletaComponent } from './consulta-completa.component';

describe('ConsultaCompletaComponent', () => {
  let component: ConsultaCompletaComponent;
  let fixture: ComponentFixture<ConsultaCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaCompletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
