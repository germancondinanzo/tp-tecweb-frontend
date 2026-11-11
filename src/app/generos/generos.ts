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

  constructor(private readonly generosService: GenerosService) { }

  ngOnInit(): void {
    this.generosService.getAll().subscribe({
      next: (datos) => {
        this.generos = datos;
      },
      error: (err) => {
        console.error('Error al cargar géneros', err);
      },
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
}
