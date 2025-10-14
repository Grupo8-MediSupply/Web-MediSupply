import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DetalleCategoriaComponent } from './detalle-categoria.component';

describe('DetalleCategoriaComponent', () => {
  let component: DetalleCategoriaComponent;
  let fixture: ComponentFixture<DetalleCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetalleCategoriaComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
