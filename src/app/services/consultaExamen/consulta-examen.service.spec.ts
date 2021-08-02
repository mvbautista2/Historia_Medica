import { TestBed } from '@angular/core/testing';

import { ConsultaExamenService } from './consulta-examen.service';

describe('ConsultaExamenService', () => {
  let service: ConsultaExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
