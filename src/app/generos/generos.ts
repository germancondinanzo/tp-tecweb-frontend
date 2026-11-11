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
}
