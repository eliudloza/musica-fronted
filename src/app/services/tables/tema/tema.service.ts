import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Temas} from '../../../components/tables/tema/tema.component';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor( private http: HttpClient) { }

  getTemas(path: string): Observable<Temas> {
    return this.http.get<Temas>(environment.apiBaseURL + path);
  }

  create(path: string, data: Temas) {
    return this.http.post(environment.apiBaseURL + path, data);
  }

  delete(path: string) {
    return this.http.delete(environment.apiBaseURL + path);
  }

  update(path: string, data: Temas) {
    return this.http.put(environment.apiBaseURL + path, data);
  }
}
