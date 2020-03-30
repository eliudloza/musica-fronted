import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Artistas} from '../../../components/tables/artista/artista.component';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor( private http: HttpClient) { }

  getArtistas(path: string): Observable<Artistas> {
    return this.http.get<Artistas>(environment.apiBaseURL + path);
  }

  create(path: string, data: Artistas) {
    return this.http.post(environment.apiBaseURL + path, data);
  }

  delete(path: string) {
    return this.http.delete(environment.apiBaseURL + path);
  }

  update(path: string, data: Artistas) {
    return this.http.put(environment.apiBaseURL + path, data);
  }
}
