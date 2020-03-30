import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Generos} from '../../../components/tables/genero/genero.component';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor( private http: HttpClient ) { }

  getGeneros(path: string): Observable<Generos> {
    return this.http.get<Generos>(environment.apiBaseURL + path);
  }

  create(path: string, data: Generos) {
    return this.http.post(environment.apiBaseURL + path, data);
  }

  delete(path: string) {
    return this.http.delete(environment.apiBaseURL + path);
  }

  update(path: string, data: Generos) {
    return this.http.put(environment.apiBaseURL + path, data);
  }
}
