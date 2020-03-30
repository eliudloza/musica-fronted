import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NacionalidadComponent } from './components/tables/nacionalidad/nacionalidad.component';
import { GeneroComponent } from './components/tables/genero/genero.component';
import { IdiomaComponent } from './components/tables/idioma/idioma.component';
import { DisqueraComponent } from './components/tables/disquera/disquera.component';
import { ArtistaComponent } from './components/tables/artista/artista.component';
import { TemaComponent } from './components/tables/tema/tema.component';
import { AlbumComponent } from './components/tables/album/album.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule, LoginOpt} from 'angularx-social-login';
import {SpotifyService} from './services/api/spotify.service';
import {SpotifyComponent} from './components/api/spotify/spotify.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('75533910497-esahaqu5rvlsr9rg7s73tmkg9en0irpg.apps.googleusercontent.com')
  }
]);
export function provideConfig() {
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NacionalidadComponent,
    GeneroComponent,
    IdiomaComponent,
    DisqueraComponent,
    ArtistaComponent,
    TemaComponent,
    AlbumComponent,
    LoginComponent,
    RegisterComponent,
    SpotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
