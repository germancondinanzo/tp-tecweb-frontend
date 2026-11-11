import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banda, BandaPayload } from '../models/banda';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BandasService {

  private readonly url = `${environment.apiUrl}/bandas`;

  constructor(private readonly http: HttpClient) { }

  getAll(generoId?: number, pais?: string, orderBy?: 'anioASC' | 'anioDESC'): Observable<Banda[]> {
    let url = this.url;
    const params: string[] = [];
    if (generoId !== undefined) {
      params.push(`generoId=${generoId}`);
    }
    if (pais) {
      params.push(`pais=${encodeURIComponent(pais)}`);
    }
    if (orderBy) {
      params.push(`order=${orderBy}`);
    }
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    return this.http.get<Banda[]>(url);
  }

  getOne(id: number): Observable<Banda> {
    return this.http.get<Banda>(`${this.url}/${id}`);
  }

  create(banda: BandaPayload): Observable<Banda> {
    return this.http.post<Banda>(this.url, banda);
  }

  update(id: number, banda: BandaPayload): Observable<Banda> {
    return this.http.put<Banda>(`${this.url}/${id}`, banda);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}