import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Producto from './producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  // TODO: Agregar parametros para paginación
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`/api/productos.json`);
  }

  getProducto(id: string): Observable<Producto> {
    return this.getProductos().pipe(
      map((productos) => {
        for (const alarma of productos) {
          if (`${alarma.id}` === `${id}`) return alarma;
        }
        throw new Error(`not-found/${id}`);
      })
    );
  }
}
