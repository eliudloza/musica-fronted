import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  getNewReleases() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQB2r2c5obVpC6stPKpASixIJb5oGKqMpf6oI_uKkyMNgVqiiIVx_wqrhC1XL5Ajccnog7GyO8wVMatiYfo'
    });
    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers});
  }

}
