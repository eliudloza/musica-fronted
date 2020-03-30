import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Disqueras} from '../../../components/tables/disquera/disquera.component';

@Injectable({
  providedIn: 'root'
})
export class DisqueraService {

  constructor( private http: HttpClient) { }

  getDisqueras(path: string): Observable<Disqueras> {
    return this.http.get<Disqueras>(environment.apiBaseURL + path);
  }

  create(path: string, data: Disqueras) {
    return this.http.post(environment.apiBaseURL + path, data);
  }

  delete(path: string) {
    return this.http.delete(environment.apiBaseURL + path);
  }

  update(path: string, data: Disqueras) {
    return this.http.put(environment.apiBaseURL + path, data);
  }
}
