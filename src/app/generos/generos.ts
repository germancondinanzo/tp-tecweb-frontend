import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Genero } from '../models/genero';
import { GenerosService } from '../services/generos.service';

@Component({
  selector: 'app-generos',
  standalone: false,
  templateUrl: './generos.html',
  styleUrl: './generos.scss',
})
export class Generos implements OnInit {

  generos: Genero[] = [];
  nuevoNombre = '';
  editandoId: number | null = null;
  nombreEditado = '';

  cargando = false;
  guardando = false;
  error = '';

  constructor(private readonly generosService: GenerosService) { }

  ngOnInit(): void {
    this.cargarGeneros();
  }

  cargarGeneros(): void {
    this.cargando = true;
    this.error = '';
    this.generosService.getAll().subscribe({
      next: (datos) => {
        this.generos = datos;
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.mensajeError(err, 'Error al cargar géneros');
        this.cargando = false;
      },
    });
  }

  crear(): void {
    this.error = '';
    const nombre = this.nuevoNombre.trim();

    if (!nombre) {
      this.error = 'El nombre del género es requerido';
      return;
    }

    this.guardando = true;
    this.generosService.create(nombre).subscribe({
      next: (genero) => {
        this.generos.push(genero);
        this.nuevoNombre = '';
        this.guardando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.mensajeError(err, 'Error al crear género');
        this.guardando = false;
      },
    });
  }

  empezarEdicion(genero: Genero): void {
    this.editandoId = genero.id;
    this.nombreEditado = genero.nombre;
    this.error = '';
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.nombreEditado = '';
  }

  guardarEdicion(genero: Genero): void {
    this.error = '';
    const nombre = this.nombreEditado.trim();

    if (!nombre) {
      this.error = 'El nombre del género es requerido';
      return;
    }

    this.guardando = true;
    this.generosService.update(genero.id, nombre).subscribe({
      next: (actualizado) => {
        this.generos = this.generos.map((g) => (g.id === actualizado.id ? actualizado : g));
        this.cancelarEdicion();
        this.guardando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.mensajeError(err, 'Error al editar género');
        this.guardando = false;
      },
    });
  }

  eliminar(genero: Genero): void {
    if (!confirm(`¿Borrar el género "${genero.nombre}"?`)) {
      return;
    }
    this.error = '';
    this.generosService.remove(genero.id).subscribe({
      next: () => {
        this.generos = this.generos.filter((g) => g.id !== genero.id);
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.mensajeError(err, 'Error al borrar género');
      },
    });
  }

  private mensajeError(err: HttpErrorResponse, contexto: string): string {
    const m = err.error?.message;
    const detalle = Array.isArray(m) ? m.join(', ') : (m ?? err.message);
    return `${contexto}: ${detalle}`;
  }
}
