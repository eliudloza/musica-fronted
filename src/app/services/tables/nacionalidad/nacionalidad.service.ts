import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Nacionalidades} from '../../../components/tables/nacionalidad/nacionalidad.component';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  constructor( private http: HttpClient) { }

  getNacionalidades(path: string): Observable<Nacionalidades> {
    return this.http.get<Nacionalidades>(environment.apiBaseURL + path);
  }

  create(path: string, data: Nacionalidades) {
    return this.http.post(environment.apiBaseURL + path, data);
  }

  delete(path: string) {
    return this.http.delete(environment.apiBaseURL + path);
  }

  update(path: string, data: Nacionalidades) {
    return this.http.put(environment.apiBaseURL + path, data);
  }
}
