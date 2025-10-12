import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UbicacionesService } from './ubicaciones.service';

describe('UbicacionesService', () => {
  let service: UbicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UbicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
