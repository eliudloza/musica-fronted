import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArtistaService} from '../../../services/tables/artista/artista.service';
import {Nacionalidades} from '../nacionalidad/nacionalidad.component';
import {NacionalidadService} from '../../../services/tables/nacionalidad/nacionalidad.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {
  artistas: Artistas[] = [];
  nacionalidades: Nacionalidades[] = [];
  form: FormGroup;
  isEdit: boolean = false;
  idx: number;
  constructor( private artistaService: ArtistaService, private nacionalidadService: NacionalidadService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.artistaService.getArtistas('api/v1/artista/').subscribe( (data: any) => {
      this.artistas= data;
      console.log(data);
    });
    this.nacionalidadService.getNacionalidades('api/v1/nacionalidad/').subscribe( (data: any) => {
      this.nacionalidades= data;
      console.log(data);
    });
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      n_identificacion: ['', [Validators.required]],
      nacionalidad_id: ['', [Validators.required]],
    });
  }
  cleanForm() {
    this.isEdit = false;
    this.idx = null;
    this.form.setValue({
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      n_identificacion: '',
      nacionalidad_id: '',
    });
  }
  editForm(artistaId: number) {
    this.isEdit = true;
    // Actualizar form con datos del artista creado
    const artista: any = this.artistas.filter(artistas => artistas.id == artistaId)[0];
    const { id, nombre, apellido_paterno, apellido_materno, n_identificacion, nacionalidad_id} = artista;
    this.idx = id;
    this.form.setValue({
      nombre,
      apellido_paterno,
      apellido_materno,
      n_identificacion,
      nacionalidad_id
    });
  }
  create() {
    if (this.form.valid) {
      this.artistaService.create('api/v1/artista/create', this.form.value).subscribe((data: Artistas) => {
        this.artistas.push(data);
      });
    }

  }
  update() {
    if (this.form.valid) {
      this.artistaService.update('api/v1/artista/update/' + this.idx, this.form.value).subscribe((data: any) => {
        const index = this.artistas.findIndex(artistas => artistas.id == data.id);
        this.artistas[index] = data;
      });
    }

  }
  delete( id: number ) {
    this.artistaService.delete('api/v1/artista/delete/' + id).subscribe((data: any) => {
      const index = this.artistas.findIndex(artista => artista.id == data.id);

      this.artistas.splice(index, 1);
    });
  }
}

export interface Artistas {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  n_identificacion: number;
  nacionalidad_id: number;
}
