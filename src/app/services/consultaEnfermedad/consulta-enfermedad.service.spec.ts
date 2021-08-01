import { TestBed } from '@angular/core/testing';

import { ConsultaEnfermedadService } from './consulta-enfermedad.service';

describe('ConsultaEnfermedadService', () => {
  let service: ConsultaEnfermedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaEnfermedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
