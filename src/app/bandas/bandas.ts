import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Banda, BandaPayload } from '../models/banda';
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
  editandoId: number | null = null;

  form = {
    nombre: '', pais: '', anioFormacion: null as number | null, generoId: null as number | null,
  };

  cargando = false;
  guardando = false;
  error = '';

  constructor(
    private readonly bandasService: BandasService,
    private readonly generosService: GenerosService,
  ) { }

  ngOnInit(): void {
    this.generosService.getAll().subscribe({
      next: (datos) => {
        this.generos = datos;
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.mensajeError(err, 'Error al cargar géneros');
      },
    });
    this.cargarBandas();
  }

  cargarBandas(): void {
    this.cargando = true;
    this.error = '';
    this.bandasService.getAll().subscribe({
      next: (datos) => {
        this.bandas = datos;
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.mensajeError(err, 'Error al cargar bandas');
        this.cargando = false;
      },
    });
  }

  guardar(): void {
    this.error = '';
    const nombre = this.form.nombre.trim();
    const pais = this.form.pais.trim();
    const anioFormacion = this.form.anioFormacion;
    const generoId = this.form.generoId;

    if (!nombre || !pais || anioFormacion == null || !generoId) {
      this.error = 'Completá todos los campos para guardar la banda';
      return;
    }

    const payload: BandaPayload = { nombre, pais, anioFormacion, generoId };
    this.guardando = true;

    if (this.editandoId === null) {
      this.bandasService.create(payload).subscribe({
        next: () => {
          this.guardando = false;
          this.resetForm();
          this.cargarBandas();
        },
        error: (err: HttpErrorResponse) => {
          this.error = this.mensajeError(err, 'Error al crear banda');
          this.guardando = false;
        },
      });
      return;
    }

    this.bandasService.update(this.editandoId, payload).subscribe({
      next: () => {
        this.guardando = false;
        this.resetForm();
        this.cargarBandas();
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.mensajeError(err, 'Error al editar banda');
        this.guardando = false;
      },
    });
  }

  empezarEdicion(banda: Banda): void {
    this.editandoId = banda.id;
    this.form = {
      nombre: banda.nombre,
      pais: banda.pais,
      anioFormacion: banda.anioFormacion,
      generoId: banda.generoId,
    };
  }

  cancelarEdicion(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.editandoId = null;
    this.form = {
      nombre: '',
      pais: '',
      anioFormacion: null,
      generoId: null,
    };
  }

  eliminar(banda: Banda): void {
    if (!confirm(`¿Borrar la banda "${banda.nombre}"?`)) {
      return;
    }
    this.error = '';
    this.bandasService.remove(banda.id).subscribe({
      next: () => this.cargarBandas(),
      error: (err: HttpErrorResponse) => {
        this.error = this.mensajeError(err, 'Error al borrar banda');
      },
    });
  }

  private mensajeError(err: HttpErrorResponse, contexto: string): string {
    const m = err.error?.message;
    const detalle = Array.isArray(m) ? m.join(', ') : (m ?? err.message);
    return `${contexto}: ${detalle}`;
  }
}
