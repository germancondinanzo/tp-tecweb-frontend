import { Component, OnInit } from '@angular/core';
import { Banda } from '../models/banda';
import { Genero } from '../models/genero';
import { BandasService } from '../services/bandas.service';
import { GenerosService } from '../services/generos.service';

@Component({
  selector: 'app-bandas',
  standalone: false,
  templateUrl: './bandas.html',
  styleUrl: './bandas.scss',
})
export class Bandas implements OnInit {

  bandas: Banda[] = [];
  generos: Genero[] = [];
  generoFiltro: number | null = null;

  constructor(
    private readonly bandasService: BandasService,
    private readonly generosService: GenerosService,
  ) { }

  ngOnInit(): void {
    this.generosService.getAll().subscribe({
      next: (datos) => {
        this.generos = datos;
      },
      error: (err) => console.error('Error al cargar géneros', err),
    });
    this.cargarBandas();
  }

  cargarBandas(): void {
    this.bandasService.getAll(this.generoFiltro ?? undefined).subscribe({
      next: (datos) => {
        this.bandas = datos;
      },
      error: (err) => console.error('Error al cargar bandas', err),
    });
  }
}
