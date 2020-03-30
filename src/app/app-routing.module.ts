import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NacionalidadComponent} from './components/tables/nacionalidad/nacionalidad.component';
import {GeneroComponent} from './components/tables/genero/genero.component';
import {IdiomaComponent} from './components/tables/idioma/idioma.component';
import {DisqueraComponent} from './components/tables/disquera/disquera.component';
import {ArtistaComponent} from './components/tables/artista/artista.component';
import {TemaComponent} from './components/tables/tema/tema.component';
import {AlbumComponent} from './components/tables/album/album.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {Auth0Guard} from './guards/auth0.guard';
import {SpotifyComponent} from './components/api/spotify/spotify.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthLocalGuard} from './guards/auth-local.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {route: 'auth'} },
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: {route: 'auth'} },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    // canActivate: [AuthGuard],
    // canActivate: [Auth0Guard],
    canActivateChild: [AuthGuard],
    // canActivateChild: [Auth0Guard],
    // canActivateChild: [AuthGuard],

    data: {route: 'dashboard'},
    children:
    [
      // Tables components
      {path: '', component: NacionalidadComponent},
      { path: 'tables/nacionalidad', component: NacionalidadComponent},
      { path: 'tables/genero', component: GeneroComponent},
      { path: 'tables/idioma', component: IdiomaComponent},
      { path: 'tables/disquera', component: DisqueraComponent},
      { path: 'tables/artista', component: ArtistaComponent},
      { path: 'tables/tema', component: TemaComponent},
      { path: 'tables/album', component: AlbumComponent},
      { path: 'tables/api', component: SpotifyComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
