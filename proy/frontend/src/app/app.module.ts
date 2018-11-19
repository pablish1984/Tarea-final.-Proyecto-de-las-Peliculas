import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material_config';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ActorComponent } from './components/actor/actor.component';
import { DirectorComponent } from './components/director/director.component';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    DirectorComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class PizzaPartyAppModule { }
