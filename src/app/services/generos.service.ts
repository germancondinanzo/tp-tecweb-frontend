import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../models/genero';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GenerosService {

  private readonly url = `${environment.apiUrl}/generos`;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.url);
  }
  create(nombre: string): Observable<Genero> {
    return this.http.post<Genero>(this.url, { nombre });
  }

  update(id: number, nombre: string): Observable<Genero> {
    return this.http.put<Genero>(`${this.url}/${id}`, { nombre });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}