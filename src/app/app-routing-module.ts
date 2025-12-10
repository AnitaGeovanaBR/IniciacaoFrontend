import { NgModule } from '@angular/core';
import { Calculadora } from './paginas/calculadora/calculadora';
import { RouterModule, Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';

const routes: Routes = [
  {
    component: Inicio,
    path: ''
  },
  {
    component: Calculadora,
    path: 'calculadora'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
