import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlbumService} from '../../../services/tables/album/album.service';
import {Artistas} from '../artista/artista.component';
import {Disqueras} from '../disquera/disquera.component';
import {DisqueraService} from '../../../services/tables/disquera/disquera.service';
import {ArtistaService} from '../../../services/tables/artista/artista.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albums: Albums[] = [];
  artistas: Artistas[] = [];
  disqueras: Disqueras[] = [];
  form: FormGroup;
  isEdit: boolean = false;
  idx: number;
  constructor( private albumService: AlbumService, private disqueraService: DisqueraService, private artistaService: ArtistaService ,private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.albumService.getAlbums('api/v1/album/').subscribe( (data: any) => {
      this.albums = data;
      console.log(data);
    });
    this.disqueraService.getDisqueras('api/v1/disquera/').subscribe( (data: any) => {
      this.disqueras = data;
      console.log(data);
    });
    this.artistaService.getArtistas('api/v1/artista/').subscribe( (data: any) => {
      this.artistas = data;
      console.log(data);
    });
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      year: ['', [Validators.required]],
      n_canciones: ['', [Validators.required]],
      artista_id: ['', [Validators.required]],
      disquera_id: ['', [Validators.required]],
    });
  }
  cleanForm() {
    this.isEdit = false;
    this.idx = null;
    this.form.setValue({
      nombre: '',
      year: '',
      n_canciones: '',
      artista_id: '',
      disquera_id: '',
    });
  }
  editForm(albumId: number) {
    this.isEdit = true;
    // Actualizar form con datos de la nacionalidad creada
    const album: any = this.albums.filter(albums => albums.id == albumId)[0];
    const { id, nombre, year, n_canciones, artista_id, disquera_id} = album;
    this.idx = id;
    this.form.setValue({
      nombre,
      year,
      n_canciones,
      artista_id,
      disquera_id
    });
  }
  create() {
    if (this.form.valid) {
      this.albumService.create('api/v1/album/create', this.form.value).subscribe((data: Albums) => {
        this.albums.push(data);
      });
    }

  }
  update() {
    if (this.form.valid) {
      this.albumService.update('api/v1/album/update/' + this.idx, this.form.value).subscribe((data: any) => {
        const index = this.albums.findIndex(albums => albums.id == data.id);
        this.albums[index] = data;
      });
    }

  }
  delete( id: number ) {
    this.albumService.delete('api/v1/album/delete/' + id).subscribe((data: any) => {
      const index = this.albums.findIndex(album => album.id == data.id);

      this.albums.splice(index, 1);
    });
  }






}

export interface Albums {
  id?: number;
  nombre: string;
  year: number;
  n_canciones: number;
  artista_id: number;
  disquera_id: number;
}
