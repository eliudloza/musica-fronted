import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Idiomas} from '../../../components/tables/idioma/idioma.component';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  constructor( private http: HttpClient) { }

  getIdiomas(path: string): Observable<Idiomas> {
    return this.http.get<Idiomas>(environment.apiBaseURL + path);
  }

  create(path: string, data: Idiomas) {
    return this.http.post(environment.apiBaseURL + path, data);
  }

  delete(path: string) {
    return this.http.delete(environment.apiBaseURL + path);
  }

  update(path: string, data: Idiomas) {
    return this.http.put(environment.apiBaseURL + path, data);
  }

}
