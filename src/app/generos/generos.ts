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

  constructor(private readonly generosService: GenerosService) { }

  ngOnInit(): void {
    this.generosService.getAll().subscribe({
      next: (datos) => {
        this.generos = datos;
      },
      error: (err) => console.error('Error al cargar géneros', err),
    });
  }

  crear(): void {
    const nombre = this.nuevoNombre.trim();
    if (!nombre) {
      return;
    }
    this.generosService.create(nombre).subscribe({
      next: (genero) => {
        this.generos.push(genero);
        this.nuevoNombre = '';
      },
      error: (err) => console.error('Error al crear género', err),
    });
  }

  empezarEdicion(genero: Genero): void {
    this.editandoId = genero.id;
    this.nombreEditado = genero.nombre;
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.nombreEditado = '';
  }

  guardarEdicion(genero: Genero): void {
    const nombre = this.nombreEditado.trim();
    if (!nombre) {
      return;
    }
    this.generosService.update(genero.id, nombre).subscribe({
      next: (actualizado) => {
        this.generos = this.generos.map((g) => (g.id === actualizado.id ? actualizado : g));
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al editar género', err),
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
      error: (err) => console.error('Error al borrar género', err),
    });
  }
}
