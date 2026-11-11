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
  editandoId: number | null = null;

  form = {
    nombre: '', pais: '', anioFormacion: null as number | null, generoId: null as number | null,
  };

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
    this.bandasService.getAll().subscribe({
      next: (datos) => {
        this.bandas = datos;
      },
      error: (err) => console.error('Error al cargar bandas', err),
    });
  }

  guardar(): void {
    const nombre = this.form.nombre.trim();
    const pais = this.form.pais.trim();
    const anioFormacion = this.form.anioFormacion;
    const generoId = this.form.generoId;

    if (!nombre || !pais || !anioFormacion || !generoId) {
      return;
    }

    const payload: BandaPayload = { nombre, pais, anioFormacion, generoId };

    if (this.editandoId === null) {
      this.bandasService.create(payload).subscribe({
        next: () => {
          this.resetForm();
          this.cargarBandas();
        },
        error: (err) => console.error('Error al crear banda', err),
      });
      return;
    }

    this.bandasService.update(this.editandoId, payload).subscribe({
      next: () => {
        this.resetForm();
        this.cargarBandas();
      },
      error: (err) => console.error('Error al editar banda', err),
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
    this.bandasService.remove(banda.id).subscribe({
      next: () => this.cargarBandas(),
      error: (err) => console.error('Error al borrar banda', err),
    });
  }
}