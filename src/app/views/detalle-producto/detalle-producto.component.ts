import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductosService } from '../../services/productos/productos.service';
import Producto from '../../services/productos/producto';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss',
})
export class DetalleProductoComponent implements OnInit {
  alarma?: Producto;

  detalleProductoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*(:[0-9]*)?([/|.|\w|\s|-])*\.(?:jp(e?)g|gif|png|svg)$/),
    ]),
    alarms: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9](,([01]?[0-9]|2[0-3]):[0-5][0-9])*$/
      ),
    ]),
    active: new FormControl(false, []),
  });

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productosService = inject(ProductosService);

  constructor() {}

  ngOnInit(): void {
    const alarmId = this.route.snapshot.paramMap.get('id');
    if (alarmId && Number.isInteger(+alarmId)) {
      this.productosService.getProducto(alarmId).subscribe({
        next: (alarma) => {
          this.alarma = alarma;
          this.detalleProductoForm.setValue({
            name: alarma.name,
            description: alarma.description,
            image: alarma.image,
            alarms: alarma.alarms.join(','),
            active: alarma.active,
          });
        },
        error: (error) => {
          console.error('Error al obtener la alarma', error);
          this.router.navigate([`/app/${error.message}`]);
        },
      });
    } // fi
  }

  public editProducto(): void {
    if (this.detalleProductoForm.valid) {
    }
  }

  public createsProducto(): void {}

  public deleteProducto(): void {}
}
