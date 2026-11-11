import { Component, OnInit } from '@angular/core';
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
  generoFiltro: number | null = null;
  editandoId: number | null = null;

  form = {
    nombre: '', pais: '', anioFormacion: null as number | null, generoId: null as number | null,
  };

  cargando = false;
  error = '';

  constructor(
    private readonly bandasService: BandasService,
    private readonly generosService: GenerosService,
  ) { }

  ngOnInit(): void {
    this.generosService.getAll().subscribe({
      next: (datos) => { this.generos = datos; },
      error: (err) => this.error = 'Error al cargar géneros: ' + (err.error?.message || err.message),
    });
    this.cargarBandas();
  }

  cargarBandas(): void {
    this.cargando = true;
    this.error = '';
    this.bandasService.getAll(this.generoFiltro ?? undefined).subscribe({
      next: (datos) => { this.bandas = datos; this.cargando = false; },
      error: (err) => {
        this.error = 'Error al cargar bandas: ' + (err.error?.message || err.message);
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
      this.error = 'Completá todos los campos (nombre, país, año y género)';
      return;
    }

    if (anioFormacion < 1900 || anioFormacion > 2100) {
      this.error = 'El año de formación debe estar entre 1900 y 2100';
      return;
    }

    this.cargando = true;
    const payload: BandaPayload = { nombre, pais, anioFormacion, generoId };

    if (this.editandoId === null) {
      this.bandasService.create(payload).subscribe({
        next: () => { this.resetForm(); this.cargarBandas(); },
        error: (err) => {
          this.error = 'Error al crear banda: ' + (err.error?.message || err.message);
          this.cargando = false;
        },
      });
      return;
    }

    this.bandasService.update(this.editandoId, payload).subscribe({
      next: () => { this.resetForm(); this.cargarBandas(); },
      error: (err) => {
        this.error = 'Error al editar banda: ' + (err.error?.message || err.message);
        this.cargando = false;
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
    this.error = '';
  }

  cancelarEdicion(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.editandoId = null;
    this.form = { nombre: '', pais: '', anioFormacion: null, generoId: null };
    this.error = '';
  }

  eliminar(banda: Banda): void {
    if (!confirm(`¿Borrar la banda "${banda.nombre}"?`)) {
      return;
    }
    this.bandasService.remove(banda.id).subscribe({
      next: () => this.cargarBandas(),
      error: (err) => this.error = 'Error al borrar banda: ' + (err.error?.message || err.message),
    });
  }
}