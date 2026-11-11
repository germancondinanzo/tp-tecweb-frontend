import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Generos } from './generos/generos';
import { Bandas } from './bandas/bandas';

const routes: Routes = [
  { path: '', redirectTo: 'bandas', pathMatch: 'full' },
  { path: 'generos', component: Generos },
  { path: 'bandas', component: Bandas },
  { path: '**', redirectTo: 'bandas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
