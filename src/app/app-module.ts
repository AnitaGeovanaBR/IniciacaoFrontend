import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Calculadora } from './paginas/calculadora/calculadora';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MenuComponent } from './components/menu/menu';
import { Inicio } from './paginas/inicio/inicio';
import { Rodape } from './components/rodape/rodape';


@NgModule({
  declarations: [
    App,
    Calculadora,
    MenuComponent,
    Inicio,
    Rodape
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
