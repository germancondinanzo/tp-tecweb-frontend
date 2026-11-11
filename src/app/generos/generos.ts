import { Component, OnInit } from '@angular/core';
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
  error = '';

  constructor(private readonly generosService: GenerosService) { }

  ngOnInit(): void {
    this.generosService.getAll().subscribe({
      next: (datos) => { this.generos = datos; },
      error: (err) => this.error = 'Error al cargar géneros: ' + (err.error?.message || err.message),
    });
  }

  crear(): void {
    this.error = '';
    const nombre = this.nuevoNombre.trim();

    if (!nombre) {
      this.error = 'El nombre del género es requerido';
      return;
    }

    this.cargando = true;
    this.generosService.create(nombre).subscribe({
      next: (genero) => {
        this.generos.push(genero);
        this.nuevoNombre = '';
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al crear género: ' + (err.error?.message || err.message);
        this.cargando = false;
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

    this.cargando = true;
    this.generosService.update(genero.id, nombre).subscribe({
      next: (actualizado) => {
        this.generos = this.generos.map((g) => (g.id === actualizado.id ? actualizado : g));
        this.cancelarEdicion();
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al editar género: ' + (err.error?.message || err.message);
        this.cargando = false;
      },
    });
  }

  eliminar(genero: Genero): void {
    if (!confirm(`¿Borrar el género "${genero.nombre}"?`)) {
      return;
    }
    this.generosService.remove(genero.id).subscribe({
      next: () => {
        this.generos = this.generos.filter((g) => g.id !== genero.id);
      },
      error: (err) => this.error = 'Error al borrar género: ' + (err.error?.message || err.message),
    });
  }
}