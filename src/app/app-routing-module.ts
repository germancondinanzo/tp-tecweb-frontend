import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Generos } from './generos/generos';
import { Bandas } from './bandas/bandas';

const routes: Routes = [
  { path: 'generos', component: Generos },
  { path: 'bandas', component: Bandas },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
