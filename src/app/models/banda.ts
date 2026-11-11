import { Genero } from './genero';

export interface Banda {
  id: number;
  nombre: string;
  pais: string;
  anioFormacion: number;
  generoId: number;
  genero: Genero;
}

export interface BandaPayload {
  nombre: string;
  pais: string;
  anioFormacion: number;
  generoId: number;
}
