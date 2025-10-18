import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Categoria from './categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private http: HttpClient) {}

  // TODO: Agregar parametros para paginación
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`/api/categorias.json`);
  }

  getCategoria(id: string): Observable<Categoria> {
    return this.getCategorias().pipe(
      map((ubicaciones) => {
        for (const ubicacion of ubicaciones) {
          if (`${ubicacion.id}` === `${id}`) return ubicacion;
        }
        throw new Error(`not-found/${id}`);
      }),
    );
  }
}
