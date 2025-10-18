import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriasService } from '../../services/categorias/categorias.service';
import Categoria from '../../services/categorias/categoria';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-detalle-categoria',
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './detalle-categoria.component.html',
  styleUrl: './detalle-categoria.component.scss',
})
export class DetalleCategoriaComponent implements OnInit {
  ubicacion?: Categoria;

  detalleCategoriaForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(http(s?):)([/|.|\w|\s|-])*(:[0-9]*)?([/|.|\w|\s|-])*\.(?:jp(e?)g|gif|png|svg)$/,
      ),
    ]),
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
    radio: new FormControl(0, [Validators.required, Validators.min(10)]),
    active: new FormControl(false, []),
  });

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ubicacionsService = inject(CategoriasService);

  constructor() {}

  ngOnInit(): void {
    const alarmId = this.route.snapshot.paramMap.get('id');
    if (alarmId && Number.isInteger(+alarmId)) {
      this.ubicacionsService.getCategoria(alarmId).subscribe({
        next: (ubicacion) => {
          this.ubicacion = ubicacion;
          this.detalleCategoriaForm.setValue({
            name: ubicacion.name,
            description: ubicacion.description,
            image: ubicacion.image,
            latitude: ubicacion.latitude,
            longitude: ubicacion.longitude,
            radio: ubicacion.radio,
            active: ubicacion.active,
          });
        },
        error: (error) => {
          console.error('Error al obtener la ubicacion', error);
          this.router.navigate([`/app/${error.message}`]);
        },
      });
    } // fi
  }

  public editCategoria(): void {
    if (this.detalleCategoriaForm.valid) {
    }
  }

  public createsCategoria(): void {}

  public deleteCategoria(): void {}
}
