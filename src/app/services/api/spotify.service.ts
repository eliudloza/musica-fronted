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
      Authorization: 'Bearer BQAiIWuFGhzEHtobKYVpVD7nF1WRWtxtbCMuTUjHt8k1ksuRcWqgby-YANgoHPxYur-mVmuYjhNgWeX7cLE'
    });
    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers});
  }

}
