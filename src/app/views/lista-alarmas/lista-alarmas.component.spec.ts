import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListaAlarmasComponent } from './lista-alarmas.component';

describe('ListaAlarmasComponent', () => {
  let component: ListaAlarmasComponent;
  let fixture: ComponentFixture<ListaAlarmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListaAlarmasComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlarmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
