import { Component, OnInit } from '@angular/core';
import { Banda } from '../models/banda';
import { BandasService } from '../services/bandas.service';

@Component({
  selector: 'app-bandas',
  standalone: false,
  templateUrl: './bandas.html',
  styleUrl: './bandas.scss',
})
export class Bandas implements OnInit {

  bandas: Banda[] = [];

  constructor(private readonly bandasService: BandasService) { }

  ngOnInit(): void {
    this.bandasService.getAll().subscribe({
      next: (datos) => {
        this.bandas = datos;
      },
      error: (err) => console.error('Error al cargar bandas', err),
    });
  }
}
