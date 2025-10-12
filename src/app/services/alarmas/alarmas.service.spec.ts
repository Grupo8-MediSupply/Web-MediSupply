import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AlarmasService } from './alarmas.service';

describe('AlarmasService', () => {
  let service: AlarmasService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AlarmasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
