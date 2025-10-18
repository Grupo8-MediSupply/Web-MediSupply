import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { CategoriasService } from '../../services/categorias/categorias.service';
import Categoria from '../../services/categorias/categoria';

@Component({
  selector: 'app-lista-categorias',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './lista-categorias.component.html',
  styleUrl: './lista-categorias.component.scss',
})
export class ListaCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriasMostrar: Categoria[] = [];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  private readonly router = inject(Router);
  private readonly categoriasService = inject(CategoriasService);

  constructor() {}

  private getCategorias(): void {
    this.categoriasService.getCategorias().subscribe((categorias) => {
      this.length = categorias.length;
      this.categorias = categorias;
      this.categoriasMostrar = this.categorias.slice(0, this.pageSize);
    });
  }

  ngOnInit(): void {
    this.getCategorias();
  }

  public handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.categoriasMostrar = this.categorias.slice(
      e.pageIndex * e.pageSize,
      e.pageIndex * e.pageSize + e.pageSize,
    );
  }

  public openDetail(id: any = null): void {
    if (id && Number.isInteger(id))
      this.router.navigate(['/app/detalle-categoria', id]);
    else this.router.navigate(['/app/detalle-categoria']);
  }
}
