import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Albums} from '../../../components/tables/album/album.component';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor( private http: HttpClient) { }

  getAlbums(path: string): Observable<Albums> {
    return this.http.get<Albums>(environment.apiBaseURL + path);
  }

  create(path: string, data: Albums) {
    return this.http.post(environment.apiBaseURL + path, data);
  }

  delete(path: string) {
    return this.http.delete(environment.apiBaseURL + path);
  }

  update(path: string, data: Albums) {
    return this.http.put(environment.apiBaseURL + path, data);
  }
}
