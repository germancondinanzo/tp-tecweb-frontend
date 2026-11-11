import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Generos } from './generos/generos';

const routes: Routes = [
  { path: 'generos', component: Generos },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
